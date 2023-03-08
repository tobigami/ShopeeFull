import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/Constants/httpStatusCode'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isUnprocessableEntity<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
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
