import { User } from './user.type'
import { SuccessResponseApi } from './utils.type'

export type AuthResponse = SuccessResponseApi<{
  access_token: string
  expires: number
  user: User
  refresh_token: string
  expires_refresh_token: number
}>
