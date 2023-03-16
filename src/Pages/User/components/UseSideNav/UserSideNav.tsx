import classNames from 'classnames'
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { path } from 'src/Constants/path'
import { AppContext } from 'src/Contexts/app.contexts'
import { PasswordIcon, PenIcon, PurchaseIcon, UserIcon } from 'src/Icons'
import { getAvatarUrl } from 'src/utils/utils'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div className='pt-4'>
      <div className='border-b border-gray-400 pb-4'>
        <Link to={path.profile} className='flex items-center'>
          <div className='h-[42px] w-[42px] flex-shrink-0'>
            <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='rounded-full object-cover' />
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
        <NavLink
          to={path.profile}
          className={({ isActive }) => {
            return classNames('mt-3 flex items-center', {
              'text-primary': isActive,
              'text-black': !isActive
            })
          }}
        >
          <UserIcon />
          <div className='ml-2 text-sm capitalize leading-5 '>tài khoản của tôi</div>
        </NavLink>

        {/* NavLink 2 */}
        <NavLink
          to={path.changePassword}
          className={({ isActive }) => {
            return classNames('mt-3 flex items-center', {
              'text-primary': isActive,
              'text-black': !isActive
            })
          }}
        >
          <PasswordIcon />

          <div className='ml-2 text-sm capitalize leading-5 '>đổi mật khẩu</div>
        </NavLink>

        {/* NavLink 3 */}
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) => {
            return classNames('mt-3 flex items-center', {
              'text-primary': isActive,
              'text-black': !isActive
            })
          }}
        >
          <PurchaseIcon />
          <div className='ml-2 text-sm capitalize leading-5 '>đơn mua</div>
        </NavLink>
      </div>
    </div>
  )
}
