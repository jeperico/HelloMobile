import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { InvalidCredentialsError, UnauthorizedError } from '../errors/webapp'
import getHeaders from './getHeaders'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface IHttpRequestParams {
  extraHeaders?: any
  showToastOnGenericErrorOnly?: boolean
  overwriteEndpoint?: string
  enableRequestThrottle?: boolean
  axiosConfig?: Omit<
    AxiosRequestConfig,
    'headers' | 'method' | 'data' | 'cancelToken'
  >
}

export interface IPostRequestParams extends IHttpRequestParams {
  body?: object | string
  image?: string
  status?: string
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const httpRequest = async (
  uri: string,
  method: HttpMethod,
  props: IPostRequestParams = {},
  isRetry = false,
): Promise<any> => {
  const headers = await getHeaders(props)

  const endpoint = `${process.env.EXPO_PUBLIC_BASE_API_URL}/${uri}`

  const body = props.body ? { data: props.body } : {}

  const params = {
    ...(props.axiosConfig || {}),
    ...body,
    headers,
    method,
  }

  try {
    const response = await axios(endpoint, params)
    return response.data
  } catch (error) {
    console.error(error)
    if (
      error instanceof AxiosError &&
      error?.response?.status &&
      [401, 403, 405].includes(error.response.status)
    ) {
      const token = await AsyncStorage.getItem('token')
      if (!isRetry && token && error.response.data.code === 'token_not_valid') {
        const refresh = await AsyncStorage.getItem('refresh')
        try {
          const refreshedResponse = await httpRequest(
            'token/refresh/',
            'POST',
            {
              body: { refresh },
            },
            true,
          )
          await AsyncStorage.setItem('token', refreshedResponse.data.access)
          return await httpRequest(endpoint, method, props, true)
        } catch (refreshError) {
          if (
            refreshError instanceof AxiosError &&
            refreshError?.response?.data?.code !== 'token_not_valid'
          ) {
            console.error('error revalidando usuário')
            return
          }
        }
      } else if (
        error.response.data.detail ===
        'No active account found with the given credentials'
      ) {
        throw new InvalidCredentialsError()
      }
      throw new UnauthorizedError(
        'Você não tem permissão para acessar esta página',
      )
    }
    throw error
  }
}

export const get = (uri: string, params?: IHttpRequestParams) =>
  httpRequest(uri, 'GET', params, false)

export const post = (uri: string, params?: IPostRequestParams) => {
  return httpRequest(uri, 'POST', params, false)
}

export const put = (uri: string, params?: IPostRequestParams) =>
  httpRequest(uri, 'PUT', params, false)

export const patch = (uri: string, params?: IPostRequestParams) =>
  httpRequest(uri, 'PATCH', params, false)

export const del = (uri: string, props?: IHttpRequestParams) =>
  httpRequest(uri, 'DELETE', props, false)
