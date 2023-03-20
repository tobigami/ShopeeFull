import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logoutAccount } from 'src/apis/auth.api'
import { path } from 'src/Constants/path'
import { purchasesStatus } from 'src/Constants/purchases'
import { AppContext } from 'src/Contexts/app.contexts'
import { ChevronIcon, GlobalIcon } from 'src/Icons'
import Popover from '../Popover'
import { getAvatarUrl } from 'src/utils/utils'

export default function NavHeader() {
  const queryClient = useQueryClient()
  const { isAuthenticated, profile, setProfile, setAuthenticated } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: () => logoutAccount(),
    onSuccess: () => {
      setAuthenticated(false)
      setProfile(null)
      // huỷ call api purchases list khi người dùng logout
      queryClient.removeQueries({ queryKey: ['purchasesList', { status: purchasesStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <nav className='flex items-center justify-end sm:flex'>
      <Popover
        className='hidden cursor-pointer items-center  py-2 hover:text-gray-300 sm:flex'
        renderChildren={
          <div className='rounded border border-gray-200 bg-white shadow-md '>
            <div className='flex flex-col py-2 px-3'>
              <button className='py-1 px-2 text-black hover:text-primary '>Tiếng Việt</button>
              <button className='py-1 px-2 text-black hover:text-primary'>Tiếng Anh</button>
            </div>
          </div>
        }
      >
        <GlobalIcon />
        <span className='px-1'>English</span>
        <ChevronIcon />
      </Popover>
      {isAuthenticated && (
        <Popover
          className='flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderChildren={
            <div className='rounded-md border border-gray-200 bg-white py-2 px-3 shadow-sm sm:py-2'>
              <Link to={path.profile} className='block py-2 px-2 text-black  hover:text-emerald-400'>
                Tài khoản của tôi
              </Link>
              <Link to={path.historyPurchase} className='block py-2 px-2 text-black  hover:text-emerald-400'>
                Đơn mua
              </Link>
              <div className='py-2 px-2'>
                <button onClick={handleLogout} className='w-full text-left text-black hover:text-emerald-400'>
                  Đăng xuất
                </button>
              </div>
            </div>
          }
        >
          <div className='ml-0 flex flex-shrink-0 cursor-pointer items-center hover:text-gray-300 sm:ml-4 '>
            <img src={getAvatarUrl(profile?.avatar)} alt='avatar' className='h-4 w-4 rounded-full sm:h-6 sm:w-6' />
            <span className='pl-1 text-xs sm:px-1 sm:pl-0 sm:text-sm'>{profile?.email}</span>
          </div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center py-1 sm:py-2'>
          <Link to='/register' className='mr-3 text-xs text-white hover:text-white/70 sm:mx-3 sm:text-sm'>
            Đăng Ký
          </Link>

          <div className='h-3 border-[1px] border-r-white/40 sm:h-4'></div>

          <Link to={path.login} className='mr-0 ml-3 text-xs text-white hover:text-white/70 sm:text-sm'>
            Đăng Nhập
          </Link>
        </div>
      )}
    </nav>
  )
}
