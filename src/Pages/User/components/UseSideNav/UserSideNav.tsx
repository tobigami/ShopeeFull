import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/Constants/path'
import { AppContext } from 'src/Contexts/app.contexts'
import { PasswordIcon, PenIcon, PurchaseIcon, UserIcon } from 'src/Icons'
import noImage from 'src/assets/Image/no-image.png'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div className='pt-4'>
      <div className='border-b border-gray-400 pb-4'>
        <Link to={path.profile} className='flex items-center'>
          <div className='h-[42px] w-[42px] flex-shrink-0'>
            <img src={profile?.avatar || noImage} alt='avatar' className='rounded-full object-cover' />
          </div>
          <div className='ml-3 flex flex-grow flex-col items-start justify-center'>
            <div className='text-sm font-semibold'>{profile?.name}</div>
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
