import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { path } from 'src/Constants/path'
import { AuthResponse } from 'src/Types/auth.type'
import { getAccessToken, clearLS, setAccessToken, setProfile } from './localStorage'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: path.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // response
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data?.access_token
          setAccessToken(this.accessToken)
          setProfile(data.data.user)
          toast.success(response.data.message)
        } else if (url === path.logout) {
          toast.success(response.data.message)
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          // handle khi access token het han
          clearLS()
          // cách 1
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
    // request
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        console.log(error)
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
