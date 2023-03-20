import axios, { AxiosError, HttpStatusCode, type InternalAxiosRequestConfig, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { path } from 'src/Constants/path'
import { AuthResponse } from 'src/Types/auth.type'
import { SuccessResponseApi, ErrorResponseApi } from 'src/Types/utils.type'
import { getAccessToken, clearLS, setAccessToken, setProfile, getRefreshToken, setRefreshToken } from './localStorage'
import { isAxiosExpiredTokenError, isUnauthorizedEntity } from './utils'

class Http {
  instance: AxiosInstance
  /**
   * tại sao lại tạo ra những biến này mà không lấy từ local storage
   * bởi vì truy cập từ LS sẽ lâu hơn
   * còn tạo biến thì sẽ được lưu vào ram, nên tốc độ nhanh hơn
   */
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessToken()
    this.refreshToken = getRefreshToken()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: path.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        // setting 5s token hết hạn
        'expire-access-token': 10 * 60,
        'expire-refresh-token': 60 * 60
      }
    })
    // response
    this.instance.interceptors.response.use(
      (response) => {
        // lấy url từ config đã được gửi lên request
        const { url } = response.config

        // handle khi url trong config trùng với nhưng url login và register trong doc api
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data?.access_token
          this.refreshToken = data.data.refresh_token
          // lưu access và refresh token vào LS
          setAccessToken(this.accessToken)
          setRefreshToken(this.refreshToken)
          setProfile(data.data.user)
          toast.success(response.data.message)
        } else if (url === URL_LOGOUT) {
          // khi logout
          toast.success(response.data.message)
          // xoá access và refresh token trong LS và gán giá trị của 2 biến là '' khi logout thành công
          this.refreshToken = ''
          this.accessToken = ''
          clearLS()
        }
        return response
      },

      /**
       * khi call api gặp lỗi thì nó sẽ nhảy vào thằng dưới đây
       */
      (error: AxiosError) => {
        // chỉ show những lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        /**
         * lỗi 401 có rất nhiều trường hợp
         * 1. token không đúng
         * 2. không truyền token
         * 3. token hết hạn
         */
        if (isUnauthorizedEntity<ErrorResponseApi<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          /**
           * trường hợp token hết hạn và request đó không phải là refresh token thì mới call api refresh token
           * dk để check có phải token hết hạn hay không thì là isAxiosExpiredTokenError
           * dk để check xem request đó có phải là refresh token hay không thì check url !== /refresh-access-token
           */

          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // tiếp tục gọi request sau khi refresh token thành công
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }
          /**
           * còn những trường hợp token không đúng
           * token hết hạn
           * gọi refresh token fail
           * thì xoá LS và toast message
           */

          toast.error(error.response?.data.data?.message || error.response?.data.message)
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
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

  private handleRefreshToken() {
    return this.instance
      .post<SuccessResponseApi<{ access_token: string }>>(URL_REFRESH_TOKEN, { refresh_token: this.refreshToken })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessToken(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        /**
         * khi nào thì refresh token bị thất bại
         * đó là khi hết hạn của refresh token
         * khi thất bại thì sẽ clear LS và các biến + cho logout
         */
        this.accessToken = ''
        this.refreshToken = ''
        clearLS()
        throw error
      })
  }
}

const http = new Http().instance
export default http
