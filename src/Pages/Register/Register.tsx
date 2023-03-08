import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import Input from 'src/components/Input'
import { registerSchemaType, registerSchema } from 'src/utils/rules'
import { registerAccount } from 'src/apis/auth.api'
import { isUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/Types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/Contexts/app.contexts'
import Button from 'src/components/Button'
import { path } from 'src/Constants/path'
// type FormData = Pick<registerSchemaType, 'confirm_password' | 'email' | 'password'>
type FormData = registerSchemaType

function Register() {
  const navigate = useNavigate()
  const { setAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
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
        <div className='grid grid-cols-1 gap-1 lg:grid-cols-5'>
          <div className='col-span-1 lg:col-span-2 lg:col-start-4 lg:pr-8 '>
            <form onSubmit={onSubmit} className='mt-2 rounded bg-white p-8 shadow-sm' noValidate>
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
                <Button
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  className='text-md w-full rounded bg-red-500 px-4 py-3 text-center uppercase text-white hover:bg-red-800'
                >
                  Đăng ký
                </Button>
              </div>

              <div className='mt-8 flex justify-center'>
                <span className='text-sm text-gray-400'>Bạn đã có tải khoản?</span>
                <Link to={path.login} className='text-md ml-2 text-orange-500'>
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
