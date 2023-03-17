import { User } from 'src/Types/user.type'

/**
 * xử lý vấn đề khi access token bị hết hạn
 * thì cần clear access token trong local storage và trong context api
 * khi clearLS thì sẽ tạo ra 1 event có type là `clearLSEvent`
 * và ở App.tsx sẽ lắng nghe sự kiện đó và thực hiện reset trong context api
 */
export const localStorageEventTarget = new EventTarget()

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('refresh_token')
  localStorageEventTarget.dispatchEvent(new Event('clearLSEvent'))
}

// handle access token
export const setAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

// handle refresh token
export const setRefreshToken = (refresh_token: string) => {
  return localStorage.setItem('refresh_token', refresh_token)
}

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token') || ''
}

// handle profile
export const setProfile = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfile = () => {
  const newProfile = localStorage.getItem('profile')
  return newProfile ? JSON.parse(newProfile) : null
}
