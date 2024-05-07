
export interface IUser {
  id: string
  email: string
  name?: string
  last_name?: string
  first_name?: string
}

export interface IAuthenticatedUser {
  user: IUser
  token: string
  refresh: string
}

export default IUser

export interface IRecoveryPassword extends IUser {
  status: string
}
