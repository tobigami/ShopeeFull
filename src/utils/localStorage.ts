export const saveAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

export const removeAccessToken = () => {
  localStorage.removeItem('access_token')
}
