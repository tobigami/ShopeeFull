import { User } from 'src/Types/user.type'
import { SuccessResponseApi } from 'src/Types/utils.type'
import http from 'src/utils/http'

export interface bodyUpdateMeType extends Omit<User, '_id' | 'createdAt' | 'roles' | 'email' | 'updatedAt'> {
  password?: string
  new_password?: string
}

export const getMeProfileAPI = () => {
  return http.get<SuccessResponseApi<User>>('me')
}

export const updateMeProfileAPI = (body: bodyUpdateMeType) => {
  return http.put<SuccessResponseApi<User>>('/user', body)
}

export const updateAvatarAPI = (body: FormData) => {
  return http.post<SuccessResponseApi<string>>('/user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
