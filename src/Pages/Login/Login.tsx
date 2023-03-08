import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Input from 'src/components/Input'
import { loginSchemaType, loginSchema } from 'src/utils/rules'
import { loginAccount } from 'src/apis/auth.api'
import { isUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/Types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/Contexts/app.contexts'
import Button from 'src/components/Button'
import { path } from 'src/Constants/path'

type Input = loginSchemaType

function Login() {
  const navigate = useNavigate()
  const { setAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Input>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Input) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
        setAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isUnprocessableEntity<ErrorResponseApi<Input>>(error)) {
          const formErrors = error.response?.data.data
          if (formErrors) {
            Object.keys(formErrors).forEach((key) => {
              setError(key as keyof Input, {
                message: formErrors[key as keyof Input],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-primary'>
      <div className='container py-4'>
        <div className='grid grid-cols-1 gap-1 lg:grid-cols-5'>
          <div className='col-span-1 lg:col-span-2 lg:col-start-4 lg:pr-8 '>
            <form className='mt-2 rounded bg-white p-8 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Nhập</div>
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
              <div className='mt-1'>
                {/* <button
                  type='submit'
                  className='uppercase rounded w-full bg-red-500 text-md text-white text-center px-4 py-3 hover:bg-red-800'
                >
                  Đăng Nhập
                </button> */}
                <Button
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                  className='text-md w-full rounded bg-red-500 px-4 py-3 text-center uppercase text-white hover:bg-red-800'
                >
                  Đăng nhập
                </Button>
              </div>

              <div className='mt-8 flex justify-center'>
                <span className='text-sm text-gray-400'>Bạn chưa có tải khoản?</span>
                <Link to={path.register} className='text-md ml-2 text-orange-500'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
