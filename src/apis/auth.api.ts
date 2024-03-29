import { path } from 'src/Constants/path'
import { AuthResponse } from 'src/Types/auth.type'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>(path.register, body)
}

export const loginAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>(path.login, body)
}

export const logoutAccount = () => {
  return http.post(path.logout)
}

export const URL_LOGIN = '/login'
export const URL_REGISTER = '/register'
export const URL_LOGOUT = '/logout'
export const URL_REFRESH_TOKEN = '/refresh-access-token'
