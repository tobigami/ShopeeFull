import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logoutAccount } from 'src/apis/auth.api'
import { path } from 'src/Constants/path'
import { AppContext } from 'src/Contexts/app.contexts'
import { CartIcon, ChevronIcon, GlobalIcon, LogoIcon, SearchIcon } from 'src/Icons'
import Popover from '../Popover'

function MainHeader() {
  const { isAuthenticated, setAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => logoutAccount(),
    onSuccess: () => {
      setAuthenticated(false)
      setProfile(null)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='bg-primary text-sm text-white'>
      <div className='container'>
        <div className='flex items-center justify-end'>
          {/* language */}
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
          {/* username */}
          {isAuthenticated && (
            <Popover
              renderChildren={
                <div className='rounded-md border border-gray-200 bg-white py-2 px-3 shadow-sm'>
                  <Link to={path.profile} className='block py-2 px-2  hover:text-emerald-400'>
                    Tài khoản của tôi
                  </Link>
                  <Link to={'/'} className='block py-2 px-2  hover:text-emerald-400'>
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
              <Link to='register' className='mx-3 text-white hover:text-white/70'>
                Đăng Ký
              </Link>

              <div className='h-4 border-[1px] border-r-white/40'></div>

              <Link to='login' className='mx-3 text-white hover:text-white/70'>
                Đăng Nhập
              </Link>
            </div>
          )}
        </div>
        <div className='grid grid-cols-12 items-center gap-3 py-2'>
          <div className='col-span-2'>
            <Link to={'/'}>
              <LogoIcon className='h-8 fill-white lg:h-11 ' />
            </Link>
          </div>
          <form className='col-span-9'>
            <div className='flex min-w-fit flex-shrink-0 rounded-sm bg-white text-black'>
              <input
                type='text'
                placeholder='Tìm kiếm sản phẩm'
                className='flex-grow rounded-sm border-none p-2 outline-none'
                name='search'
              />
              <button className='m-1 cursor-pointer rounded-sm bg-primary px-4 hover:opacity-70'>
                <SearchIcon color='white' />
              </button>
            </div>
          </form>
          <div className='cols-span-1 flex justify-end'>
            <Popover
              // initialState={true}
              renderChildren={
                // container
                <div className='max-w-[400px] rounded-md border border-gray-300 bg-white py-4 px-3 text-sm shadow-sm '>
                  {/* title */}
                  <div className='mt-1 capitalize text-gray-400'>Sản phẩm mới thêm</div>
                  {/* body */}
                  <div className='my-2'>
                    {/* item */}
                    <div className='my-4 flex items-center p-2 hover:bg-neutral-100'>
                      {/* avatar */}
                      <div className='mr-3 flex-shrink-0'>
                        <img
                          className='h-[42px] w-[42px] object-cover'
                          src='https://cf.shopee.vn/file/sg-11134201-22100-id42sk79kriv06_tn'
                          alt='product'
                        />
                      </div>
                      {/* description */}
                      <div className='flex-grow-1 overflow-hidden'>
                        <div className='truncate'>Tai nghe nhét trong không dây BASEUS WM02 bluetooth 5.3 TWS</div>
                      </div>
                      {/* price */}
                      <div className='flex-shirk-0 ml-4'>
                        <div className='text-primary'>₫369.000</div>
                      </div>
                    </div>
                  </div>
                  {/* footer */}
                  <div className='flex items-center justify-between'>
                    <div className='capitalize text-gray-400'>Thêm vào giỏ hàng</div>
                    <div className='rounded-sm bg-primary hover:opacity-90'>
                      <button className='py-2 px-4 capitalize text-white'>Xem giỏ hàng</button>
                    </div>
                  </div>
                </div>
              }
            >
              <CartIcon className='h-9 w-9 flex-shrink-0 cursor-pointer hover:text-gray-300' />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
