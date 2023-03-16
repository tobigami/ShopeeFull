import { Fragment } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { FormInputType } from '../../Pages/Profile/Profile'

export default function InfoContext() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormInputType>()
  return (
    <Fragment>
      <div className='mt-2 flex flex-col sm:mt-4 sm:flex-row sm:items-baseline'>
        <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>tên</div>
        <div className='sm:w-[80%]'>
          <Input
            name='name'
            register={register}
            errorsMessage={errors.name?.message}
            placeholder='Nhập tên của bạn'
            classInput='rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full py-1 px-2 outline-none'
          />
        </div>
      </div>

      {/* address */}
      <div className='flex flex-col sm:flex-row sm:items-baseline'>
        <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>địa chỉ</div>
        <div className='sm:w-[80%]'>
          <Input
            name='address'
            register={register}
            placeholder='Nhập địa chỉ của bạn'
            errorsMessage={errors.address?.message}
            classInput='rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full py-1 px-2 outline-none'
          />
        </div>
      </div>

      {/* phone number */}
      <div className=' flex flex-col sm:flex-row sm:items-baseline'>
        <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>số điện thoại</div>
        <div className='sm:w-[80%]'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                errorsMessage={errors.phone?.message}
                placeholder='Nhập số điện thoại của bạn'
                classInput='rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full py-1 px-2 outline-none'
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}
