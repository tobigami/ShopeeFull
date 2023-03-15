import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { userSchemaInfo, userSchemaInfoType } from 'src/utils/rules'
import { bodyUpdateMeType, getMeProfileAPI, updateMeProfileAPI } from 'src/apis/profile.api'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import { useContext, useEffect } from 'react'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/Contexts/app.contexts'
import { setProfile as setProfileLS } from 'src/utils/localStorage'
import noImage from 'src/assets/Image/no-image.png'

type FormInputType = userSchemaInfoType

export default function Profile() {
  const { profile: profileContext, setProfile: setProfileContext } = useContext(AppContext)

  console.log('profileContext', profileContext)
  // call api get info user
  const { data: profileData, refetch } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getMeProfileAPI
  })
  const profile = profileData?.data.data

  const UpdateInfoMutation = useMutation({
    mutationFn: (body: bodyUpdateMeType) => updateMeProfileAPI(body)
  })

  // khai báo sử dụng useForm
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormInputType>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      avatar: '',
      // tháng trong js sẽ được bắt đầu từ số 0 - 11 || format: năm - tháng - ngày
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(userSchemaInfo)
  })

  // truyền những giá trị trả về từ gọi api vào from và hiện thị lên giao diện

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('address', profile.address)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const res = await UpdateInfoMutation.mutateAsync({ ...data, date_of_birth: data.date_of_birth?.toISOString() })
    // refetch api get me info khi update info thành công
    refetch()
    // set lại profile trong app context khi update thành công
    setProfileContext(res.data.data)
    // set lai profile trong local storage
    setProfileLS(res.data.data)
    toast.success(res.data.message)
  })
  return (
    <div className='rounded-sm bg-white p-4 shadow-sm'>
      {/* header */}
      <div className='border-b-[1px] border-gray-200 pb-3'>
        <h1 className='text-xl capitalize text-gray-700'>hồ sơ của tôi</h1>
        <div className='text-sm capitalize text-gray-600'>quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      {/* body */}
      <div className='mt-2 '>
        {/* Information */}
        <form
          onSubmit={onSubmit}
          className='mt-4 flex flex-grow flex-col-reverse sm:mt-0 sm:flex-row sm:items-start sm:pr-8'
        >
          <div className='flex-grow sm:pr-[16px]'>
            <div className='flex flex-col sm:flex-row'>
              <div className='w-[20%] capitalize text-gray-600 sm:mr-4 sm:text-right'>email</div>
              <div className='w-[80%]'>{profile?.email}</div>
            </div>

            {/* name */}
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

            {/* date */}
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorsMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />

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
          {/* image avatar */}
          <div className='flex flex-col items-center sm:border-l-[1px] sm:border-gray-200 sm:pl-4'>
            <div className='h-[200px] w-[200px]'>
              <img src={profileContext?.avatar || noImage} alt='avatar' className='rounded-full' />
            </div>
            <div>
              <input type='file' accept='.jpg,.jpeg,.png' className='hidden' />
            </div>
            <button className='mt-3 rounded-sm border border-gray-400 px-4 py-2 capitalize hover:bg-gray-100'>
              chọn ảnh
            </button>
            <div className='mt-3 text-sm text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
