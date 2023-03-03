import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
type FormData = Schema

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const onSubmit = handleSubmit(
    (data) => {
      // console.log(data)
    },
    (data) => {
      const password = getValues('password')
      console.log(password)
    }
  )

  return (
    <div className='bg-primary'>
      <div className='container py-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-1'>
          <div className='col-span-1 lg:col-span-2 lg:col-start-4 lg:pr-8 '>
            <form onSubmit={onSubmit} className='mt-2 bg-white rounded shadow-sm p-8'>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                register={register}
                errorsMessage={errors.email?.message}
                autoComplete='on'
                className='mt-3'
                placeholder='Enter your email'
                name='email'
                type='text'
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
