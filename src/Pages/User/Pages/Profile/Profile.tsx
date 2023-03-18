import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import Button from 'src/components/Button'
import { userSchemaInfo, userSchemaInfoType } from 'src/utils/rules'
import { bodyUpdateMeType, getMeProfileAPI, updateAvatarAPI, updateMeProfileAPI } from 'src/apis/profile.api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useState } from 'react'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/Contexts/app.contexts'
import { setProfile as setProfileLS } from 'src/utils/localStorage'
import { getAvatarUrl, isUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/Types/utils.type'
import InputFile from '../../components/InputFile'
import InfoContext from '../../components/InfoContext'
import { Helmet } from 'react-helmet-async'

export type FormInputType = userSchemaInfoType

// tạo type form error nhưng sửa lại type của thằng date do response từ sever trả về thì date là string chứ k phải string
export type FormInputError = Omit<FormInputType, 'date_of_birth'> & {
  date_of_birth?: string
}

export default function Profile() {
  const { profile: profileContext, setProfile: setProfileContext } = useContext(AppContext)

  // call api get info user
  const { data: profileData, refetch } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getMeProfileAPI
  })
  const profile = profileData?.data.data

  // Mutation update Info
  const UpdateInfoMutation = useMutation({
    mutationFn: (body: bodyUpdateMeType) => updateMeProfileAPI(body)
  })

  // Mutation Update Avatar
  const UpdateAvatarMutation = useMutation(updateAvatarAPI)

  // khai báo sử dụng useForm
  const methods = useForm<FormInputType>({
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

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    setError
  } = methods

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

  // state luu local image
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
  }, [file])

  const avatar = watch('avatar')

  /**
   *  có 2 flow up load ảnh như sau
   * 1. khi chọn ảnh thì sẽ upload lên sv luôn -> sv sẽ trả về 1 url string
   * dùng url đó để update info
   * --> cho phản hồi nhanh khi submit, nhưng sẽ để lại rác trên sv nếu người dùng thay đổi khác liên tục
   * 2. khi chọn ảnh thì k upload luôn, mà khi người dùng submit thì sẽ thực hiện 2 công việc
   * upload ảnh xong rồi mới update info
   * --> chậm hơn cách 1 do phải upload ảnh rồi mới update info khi người dùng submit, nhưng tránh được rác trên sv
   * ==> chọn làm theo cách 2
   */

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const res = await UpdateAvatarMutation.mutateAsync(form)
        avatarName = res.data.data
        setValue('avatar', avatarName)
      }

      const res = await UpdateInfoMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      // refetch api get me info khi update info thành công
      refetch()
      // set lại profile trong app context khi update thành công
      setProfileContext(res.data.data)
      // set lai profile trong local storage
      setProfileLS(res.data.data)
      toast.success(res.data.message)
    } catch (error) {
      /**
       * xử lý hiện lỗi do sever trả về
       */
      if (isUnprocessableEntity<ErrorResponseApi<FormInputError>>(error)) {
        const formErrors = error.response?.data.data
        if (formErrors) {
          // option 2
          Object.keys(formErrors).forEach((key) => {
            setError(key as keyof FormInputError, {
              message: formErrors[key as keyof FormInputError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChange = (file: File) => {
    setFile(file)
  }
  return (
    <div className='rounded-sm bg-white p-4 shadow-sm'>
      <Helmet>
        <title>Thông tin tài khoản | Shopee Clone</title>
        <meta name='Info Page' content='thông tin tài khoản của bạn' />
      </Helmet>
      {/* header */}
      <div className='border-b-[1px] border-gray-200 pb-3'>
        <h1 className='text-xl capitalize text-gray-700'>hồ sơ của tôi</h1>
        <div className='text-sm capitalize text-gray-600'>quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      {/* body */}
      <div className='mt-2 '>
        {/* Information */}
        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            className='mt-4 flex flex-grow flex-col-reverse sm:mt-0 sm:flex-row sm:items-start sm:pr-8'
          >
            <div className='flex-grow sm:pr-[16px]'>
              <div className='flex flex-col sm:flex-row'>
                <div className='w-[20%] capitalize text-gray-600 sm:mr-4 sm:text-right'>email</div>
                <div className='w-[80%]'>{profile?.email}</div>
              </div>
              {/* input info useContextForm */}
              <InfoContext />
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
                <img
                  src={previewImage || getAvatarUrl(profileContext?.avatar)}
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <InputFile onChange={handleChange} />
              <div className='mt-3 text-sm text-gray-400'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
