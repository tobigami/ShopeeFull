import { User } from 'src/Types/user.type'

// handle access token
export const setAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

// handle profile
export const setProfile = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfile = () => {
  const newProfile = localStorage.getItem('profile')
  return newProfile ? JSON.parse(newProfile) : null
}
