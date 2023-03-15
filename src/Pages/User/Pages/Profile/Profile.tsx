import React from 'react'
import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white p-4 shadow-sm'>
      {/* header */}
      <div className='border-b-[1px] border-gray-200 pb-3'>
        <h1 className='text-xl capitalize text-gray-700'>hồ sơ của tôi</h1>
        <div className='text-sm capitalize text-gray-600'>quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      {/* body */}
      <div className='mt-2 flex flex-col-reverse sm:flex-row sm:items-start'>
        {/* Information */}
        <form className='mt-4 flex-grow sm:mt-0 sm:pr-8'>
          <div className='flex flex-col sm:flex-row'>
            <div className='w-[20%] capitalize text-gray-600 sm:mr-4 sm:text-right'>email</div>
            <div className='w-[80%]'>th**********@gmail.com</div>
          </div>

          {/* name */}
          <div className='mt-2 flex flex-col sm:mt-4 sm:flex-row sm:items-center'>
            <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>tên</div>
            <div className='sm:w-[80%]'>
              <Input
                name='name'
                classInput='rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full py-1 px-2 outline-none'
                classError='hidden'
              />
            </div>
          </div>

          {/* address */}
          <div className='mt-2 flex flex-col sm:mt-4 sm:flex-row sm:items-center'>
            <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>đại chỉ</div>
            <div className='sm:w-[80%]'>
              <Input
                name='name'
                classInput='rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full py-1 px-2 outline-none'
                classError='hidden'
              />
            </div>
          </div>

          {/* phone number */}
          <div className='mt-2 flex flex-col sm:mt-4 sm:flex-row sm:items-center'>
            <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>số điện thoại</div>
            <div className='sm:w-[80%]'>
              <Input
                name='name'
                classInput='rounded border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full py-1 px-2 outline-none'
                classError='hidden'
              />
            </div>
          </div>

          {/* date */}

          <div className='mt-2 flex flex-col sm:mt-4 sm:flex-row sm:items-center'>
            <div className='capitalize text-gray-600 sm:mr-4 sm:w-[20%] sm:text-right'>ngày sinh</div>
            <div className='flex justify-between sm:w-[80%] sm:justify-between'>
              <select className='h-8 w-[30%] rounded border border-gray-400 px-3' defaultValue='ngay'>
                <option value='ngay' className='text-gray-600' disabled>
                  Ngày
                </option>
              </select>

              <select className='h-8 w-[30%] rounded border border-gray-400 px-3' defaultValue='thang'>
                <option value='thang' className=' text-gray-600' disabled>
                  Tháng
                </option>
              </select>

              <select className='h-8 w-[30%] rounded border border-gray-400 px-3' defaultValue='nam'>
                <option value='nam' className=' text-gray-600' disabled>
                  Năm
                </option>
              </select>
            </div>
          </div>
        </form>
        {/* image avatar */}
        <div className='flex flex-col items-center sm:border-l-[1px] sm:border-gray-200 sm:pl-4'>
          <div className='h-[200px] w-[200px]'>
            <img
              src='https://64.media.tumblr.com/cb52590d692ca06eabb337e09b7e6a8a/9ce64517d7ffbc55-97/s1280x1920/bcd73dc9c2a920a4775c74bd82009c55a82248fd.jpg'
              alt='avatar'
              className='rounded-full'
            />
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
      </div>
    </div>
  )
}
