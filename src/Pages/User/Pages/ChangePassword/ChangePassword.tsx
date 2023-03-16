import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { updateMeProfileAPI } from 'src/apis/profile.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponseApi } from 'src/Types/utils.type'
import { userChangePassWordSchema, userChangePassWordType } from 'src/utils/rules'
import { isUnprocessableEntity } from 'src/utils/utils'

export default function ChangePassword() {
  const [show, setShow] = useState<string>('password')
  const onChangeShow = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setShow('text')
    } else {
      setShow('password')
    }
  }
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<userChangePassWordType>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(userChangePassWordSchema)
  })

  const handleChangePassWordMutation = useMutation({
    mutationFn: updateMeProfileAPI
  })

  const onSubmit = handleSubmit((data) => {
    const params = omit(data, ['confirm_password'])
    handleChangePassWordMutation.mutate(params, {
      onSuccess: (data) => {
        console.log('data', data)
        toast.success(data.data.message)
        reset()
      },
      onError: (error) => {
        // handle những lỗi mà sever gửi về
        if (isUnprocessableEntity<ErrorResponseApi<userChangePassWordType>>(error)) {
          const formErrors = error.response?.data.data
          if (formErrors) {
            // option 2
            Object.keys(formErrors).forEach((key) => {
              setError(key as keyof userChangePassWordType, {
                message: formErrors[key as keyof userChangePassWordType],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='rounded-sm bg-white p-4 shadow-sm'>
      {/* header */}
      <div className='border-b-[1px] border-gray-200 pb-3'>
        <h1 className='text-xl capitalize text-gray-700'>Đổ mật khẩu</h1>
        <div className='text-sm capitalize text-gray-600'>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </div>
      </div>
      {/* body */}
      <div className='mt-2 '>
        {/* Information */}
        <form
          onSubmit={onSubmit}
          className='mt-4 flex flex-grow flex-col-reverse sm:mt-4 sm:flex-row sm:items-start sm:pr-8'
        >
          <div className='flex-grow'>
            {/* current password */}
            <div className='flex flex-col sm:flex-row sm:items-baseline'>
              <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>mật khẩu hiện tại</div>
              <div className='sm:w-[40%]'>
                <Input
                  type={show}
                  name='password'
                  register={register}
                  placeholder='Nhập mật khẩu hiện tại của bạn'
                  errorsMessage={errors.password?.message}
                  classInput='rounded-sm border border-gray-400 focus:border-gray-500 focus:shadow-sm w-full py-1 px-2 outline-none'
                />
              </div>
            </div>

            {/* new password */}
            <div className='flex flex-col sm:flex-row sm:items-baseline'>
              <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>mật khẩu mới</div>
              <div className='sm:w-[40%]'>
                <Input
                  type={show}
                  name='new_password'
                  register={register}
                  placeholder='Nhập mật khẩu mới'
                  errorsMessage={errors.new_password?.message}
                  classInput='rounded-sm border border-gray-400 focus:border-gray-500 focus:shadow-sm w-full py-1 px-2 outline-none'
                />
              </div>
            </div>
            {/* confirm password */}
            <div className='flex flex-col sm:flex-row sm:items-baseline'>
              <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>xác nhận mật khẩu</div>
              <div className='sm:w-[40%]'>
                <Input
                  type={show}
                  name='confirm_password'
                  register={register}
                  placeholder='Xác nhận mật khẩu của bạn'
                  errorsMessage={errors.confirm_password?.message}
                  classInput='rounded-sm border border-gray-400 focus:border-gray-500 focus:shadow-sm w-full py-1 px-2 outline-none'
                />
              </div>
            </div>

            <div className='mt-3 flex sm:flex-row sm:items-start'>
              <div className='w-[20%] text-right'>
                <input type='checkbox' className='h-4 w-4' onChange={onChangeShow} checked={Boolean(show === 'text')} />
              </div>
              <div className='flex-grow pl-4'>
                <div className='text-md capitalize text-gray-500'>hiện thị mật khẩu</div>
              </div>
            </div>
            {/* btn submit */}
            <div className='mt-8'>
              <Button
                className='h-10 w-16 rounded bg-primary text-lg capitalize text-white hover:bg-primary/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
