// import { omit } from 'lodash'
import { type RegisterOptions, type UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Bạn chưa nhập email'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không hợp lệ'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 đến 160 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Bạn Chưa Nhập Password'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Bạn Chưa Nhập Password'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 kí tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => (value === getValues('password') ? true : 'Nhập password không khớp')
        : undefined
  }
})

function testMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_min) <= Number(price_max)
  }
  return price_max !== '' || price_min !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Bạn chưa nhập email')
    .email('Email không hợp lệ')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 - 160 kí tự'),
  password: yup
    .string()
    .required('Bạn chưa nhập password')
    .min(6, 'Độ dài từ từ 6 - 160 kí tự')
    .max(160, 'Độ dài từ 6 - 160 kí tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password')
    .min(6, 'Độ dài từ 6 -160 kí tự')
    .max(160, 'Độ dài từ 6 - 160 kí tự')
    .oneOf([yup.ref('password')], 'Password không khớp'),
  price_min: yup.string().test({
    name: 'price-no-allowed',
    message: 'Giá không phù hợp',
    test: testMinMax
  }),
  price_max: yup.string().test({
    name: 'price-no-allowed',
    message: 'Giá không phù hợp',
    test: testMinMax
  })
})

export type schemaType = yup.InferType<typeof schema>

export const registerSchema = schema.omit(['price_max', 'price_min'])
export type registerSchemaType = yup.InferType<typeof registerSchema>

export const loginSchema = schema.omit(['confirm_password', 'price_max', 'price_min'])
export type loginSchemaType = yup.InferType<typeof loginSchema>
