import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Input from 'src/components/Input'
import { loginSchema } from 'src/utils/rules'
import { loginAccount } from 'src/apis/auth.api'
import { isUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/Types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/Contexts/app.contexts'

type Input = loginSchema

function Login() {
  const navigate = useNavigate()
  const { setAuthenticated } = useContext(AppContext)
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
        setAuthenticated(true)
        navigate('/')
        console.log(data)
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
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-1'>
          <div className='col-span-1 lg:col-span-2 lg:col-start-4 lg:pr-8 '>
            <form className='mt-2 bg-white rounded shadow-sm p-8' noValidate onSubmit={onSubmit}>
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
                <button
                  type='submit'
                  className='uppercase rounded w-full bg-red-500 text-md text-white text-center px-4 py-3 hover:bg-red-800'
                >
                  Đăng Nhập
                </button>
              </div>

              <div className='mt-8 flex justify-center'>
                <span className='text-sm text-gray-400'>Bạn chưa có tải khoản?</span>
                <Link to={'/register'} className='ml-2 text-orange-500 text-md'>
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
