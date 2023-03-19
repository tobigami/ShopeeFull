import { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/Constants/httpStatusCode'
import { describe, it, expect } from 'vitest'
import { isAxiosError, isUnprocessableEntity } from '../utils'
// describe dùng để mô tả 1 ngữ cảnh hoặc 1 đơn vị cần test : function, component
describe('isAxiosError', () => {
  // dùng để ghi chú trong trường hợp cần test
  it('it trả về boolean ', () => {
    //expect dùng để mong đợi trả về với từng tham số tương ứng
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isUnprocessableEntity', () => {
  it('isUnprocessableEntity trả về boolean', () => {
    expect(isUnprocessableEntity(new Error())).toBe(false)
    expect(isUnprocessableEntity(new AxiosError())).toBe(false)
    expect(
      isUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})
