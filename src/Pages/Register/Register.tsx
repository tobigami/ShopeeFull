import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from 'src/utils/rules'
type FormData = {
  email: string
  password: string
  confirm_password: string
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>()
  const onSubmit = handleSubmit(
    (data) => {
      // console.log(data)
    },
    (data) => {
      const password = getValues('password')
      console.log(password)
    }
  )
  const rules = getRules(getValues)

  return (
    <div className='bg-primary'>
      <div className='max-w-7xl mx-auto p-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-1'>
          <div className='col-span-1 lg:col-span-2 lg:col-start-4 lg:pr-8 '>
            <form onSubmit={onSubmit} className='mt-2 bg-white rounded shadow-sm p-8'>
              <div className='text-2xl'>Đăng Ký</div>
              <div className='mt-3'>
                <input
                  autoComplete='on'
                  type='text'
                  placeholder='Enter Your Email'
                  {...register('email', rules.email)}
                  className='rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-10 p-2 outline-none'
                ></input>
                <div className='text-red-600 mt-1 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  autoComplete='on'
                  type='password'
                  placeholder='Enter Your Password'
                  {...register('password', rules.password)}
                  className='rounded  border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-10 p-2 outline-none'
                ></input>
                <div className='text-red-600 mt-1 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  autoComplete='on'
                  type='password'
                  placeholder='Confirm Password'
                  {...register('confirm_password', {
                    ...rules.confirm_password
                  })}
                  className='rounded  border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-10 p-2 outline-none'
                ></input>
                <div className='text-red-600 mt-1 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div>
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
