import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logoutAccount } from 'src/apis/auth.api'
import { path } from 'src/Constants/path'
import { purchasesStatus } from 'src/Constants/purchases'
import { AppContext } from 'src/Contexts/app.contexts'
import { ChevronIcon, GlobalIcon } from 'src/Icons'
import Popover from '../Popover'

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
    <nav className='flex items-center justify-end'>
      <Popover
        renderChildren={
          <div className='rounded border border-gray-200 bg-white shadow-md '>
            <div className='flex flex-col py-2 px-3'>
              <button className='py-1 px-2 hover:text-primary '>Tiếng Việt</button>
              <button className='py-1 px-2 hover:text-primary'>Tiếng Anh</button>
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
          renderChildren={
            <div className='rounded-md border border-gray-200 bg-white py-2 px-3 shadow-sm'>
              <Link to={path.user} className='block py-2 px-2  hover:text-emerald-400'>
                Tài khoản của tôi
              </Link>
              <Link to={path.historyPurchase} className='block py-2 px-2  hover:text-emerald-400'>
                Đơn mua
              </Link>
              <div className='py-2 px-2'>
                <button onClick={handleLogout} className='w-full text-left hover:text-emerald-400'>
                  Đăng xuất
                </button>
              </div>
            </div>
          }
        >
          <div className='ml-4 flex flex-shrink-0 cursor-pointer items-center hover:text-gray-300'>
            <img
              src='https://64.media.tumblr.com/cb52590d692ca06eabb337e09b7e6a8a/9ce64517d7ffbc55-97/s1280x1920/bcd73dc9c2a920a4775c74bd82009c55a82248fd.jpg'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='px-1'>{profile?.email}</span>
          </div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center py-2'>
          <Link to='/register' className='mx-3 text-white hover:text-white/70'>
            Đăng Ký
          </Link>

          <div className='h-4 border-[1px] border-r-white/40'></div>

          <Link to={path.login} className='mx-3 text-white hover:text-white/70'>
            Đăng Nhập
          </Link>
        </div>
      )}
    </nav>
  )
}
