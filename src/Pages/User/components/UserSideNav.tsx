import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/Constants/path'
import { PasswordIcon, PenIcon, PurchaseIcon, UserIcon } from 'src/Icons'

export default function UserSideNav() {
  return (
    <div className='pt-4'>
      <div className='border-b border-gray-400 pb-4'>
        <Link to={path.profile} className='flex items-center'>
          <div className='h-[42px] w-[42px] flex-shrink-0'>
            <img
              src='https://64.media.tumblr.com/cb52590d692ca06eabb337e09b7e6a8a/9ce64517d7ffbc55-97/s1280x1920/bcd73dc9c2a920a4775c74bd82009c55a82248fd.jpg'
              alt='avatar'
              className='rounded-full object-cover'
            />
          </div>
          <div className='ml-3 flex flex-grow flex-col items-start justify-center'>
            <div className='text-sm font-semibold'>thanhdd</div>
            <div className='flex items-center text-sm capitalize text-gray-600'>
              <PenIcon />
              sửa hồ sơ
            </div>
          </div>
        </Link>
      </div>

      <div>
        {/* link 1 */}
        <Link to={path.profile} className='mt-3 flex items-center'>
          <UserIcon />
          <div className='ml-2 text-sm capitalize leading-5 text-primary'>tài khoản của tôi</div>
        </Link>

        {/* link 2 */}
        <Link to={path.changePassword} className='mt-3 flex items-center'>
          <PasswordIcon />

          <div className='ml-2 text-sm capitalize leading-5 text-black'>đổi mật khẩu</div>
        </Link>

        {/* link 3 */}
        <Link to={path.historyPurchase} className='mt-3 flex items-center'>
          <PurchaseIcon />
          <div className='ml-2 text-sm capitalize leading-5 text-black'>đơn mua</div>
        </Link>
      </div>
    </div>
  )
}
