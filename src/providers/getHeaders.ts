import AsyncStorage from '@react-native-async-storage/async-storage'
import { IHttpRequestParams } from './api'

const getHeaders = async (props: IHttpRequestParams) => {
  let token = null
  if (typeof window !== 'undefined') {
    token = await AsyncStorage.getItem('token')
  }
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {}
  const headers = {
    ...authHeader,
    'Content-type': 'application/json',
    ...props.extraHeaders,
  }

  return headers
}
export default getHeaders
