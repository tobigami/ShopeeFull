import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/Constants/httpStatusCode'
import { path } from 'src/Constants/path'
import NoImage from 'src/assets/Image/no-image.png'
import { ErrorResponseApi } from 'src/Types/utils.type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

// type predicate error status 422
export function isUnprocessableEntity<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

// type predicate error status 401
export function isUnauthorizedEntity<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

// type predicate error status 401 và kiểu tra xem có phải do token hết hạn không
export function isAxiosExpiredTokenError<T>(error: unknown): error is AxiosError<T> {
  return (
    isUnauthorizedEntity<ErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
}

// convert price
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

// convert sold
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function saleValue(before: number, after: number) {
  return Math.round(((before - after) / before) * 100)
}

/**
 * cú pháp `-?` sẽ loại bỏ undefined những key option
 */
export type noUndefinedFinder<T> = {
  [P in keyof T]-?: noUndefinedFinder<NonNullable<T[P]>>
}

/**
 *
 * @returns hàm xoá đi những kí từ đặc biệt
 */
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName: string | undefined) => {
  return avatarName ? `${path.baseURL}/images/${avatarName}` : NoImage
}
