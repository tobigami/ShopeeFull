import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import Input from 'src/components/Input'
import { schema, registerSchema } from 'src/utils/rules'
import { registerAccount } from 'src/apis/auth.api'
import { isUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/Types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/Contexts/app.contexts'
type FormData = registerSchema

function Register() {
  const navigate = useNavigate()
  const { setAuthenticated } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        setAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isUnprocessableEntity<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formErrors = error.response?.data.data

          if (formErrors) {
            // option 2
            Object.keys(formErrors).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formErrors[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }

          // option 1
          // if (formErrors?.email) {
          //   setError('email', {
          //     message: formErrors.email,
          //     type: 'Server'
          //   })
          // }
          // if (formErrors?.password) {
          //   setError('password', {
          //     message: formErrors.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className='bg-primary'>
      <div className='container py-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-1'>
          <div className='col-span-1 lg:col-span-2 lg:col-start-4 lg:pr-8 '>
            <form onSubmit={onSubmit} className='mt-2 bg-white rounded shadow-sm p-8' noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                register={register}
                errorsMessage={errors.email?.message}
                autoComplete='on'
                className='mt-3'
                placeholder='Enter your email'
                name='email'
                type='email'
              />

              <Input
                name='password'
                type='password'
                className='mt-3'
                placeholder='Enter your password'
                autoComplete='on'
                errorsMessage={errors.password?.message}
                register={register}
              />

              <Input
                name='confirm_password'
                type='password'
                className='mt-3'
                placeholder='Confirm password'
                autoComplete='on'
                errorsMessage={errors.confirm_password?.message}
                register={register}
              />

              <div className='mt-1'>
                <button
                  type='submit'
                  className='uppercase rounded w-full bg-red-500 text-md text-white text-center px-4 py-3 hover:bg-red-800'
                >
                  Đăng Ký
                </button>
              </div>

              <div className='mt-8 flex justify-center'>
                <span className='text-sm text-gray-400'>Bạn đã có tải khoản?</span>
                <Link to={'/login'} className='ml-2 text-orange-500 text-md'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
