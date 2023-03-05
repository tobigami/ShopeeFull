import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logoutAccount } from 'src/apis/auth.api'
import { AppContext } from 'src/Contexts/app.contexts'
import { CartIcon, ChevronIcon, GlobalIcon, LogoIcon, SearchIcon } from 'src/Icons'
import Popover from '../Popover'

function MainHeader() {
  const { isAuthenticated, setAuthenticated } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => logoutAccount(),
    onSuccess: () => {
      setAuthenticated(false)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='bg-primary text-white text-sm'>
      <div className='container'>
        <div className='flex justify-end items-center'>
          {/* language */}
          <Popover
            renderChildren={
              <div className='bg-white border border-gray-200 shadow-md rounded '>
                <div className='flex flex-col py-2 px-3'>
                  <button className='hover:text-primary py-1 px-2 '>Tiếng Việt</button>
                  <button className='hover:text-primary py-1 px-2'>Tiếng Anh</button>
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
                <div className='bg-white border border-gray-200 shadow-sm py-2 px-3 rounded-md'>
                  <Link to={'/profile'} className='block py-2 px-2  hover:text-emerald-400'>
                    Tài khoản của tôi
                  </Link>
                  <Link to={'/'} className='block py-2 px-2  hover:text-emerald-400'>
                    Đơn mua
                  </Link>
                  <div className='py-2 px-2'>
                    <button onClick={handleLogout} className='text-left w-full hover:text-emerald-400'>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              }
            >
              <div className='flex items-center hover:text-gray-300 cursor-pointer flex-shrink-0 ml-4'>
                <img
                  src='https://64.media.tumblr.com/cb52590d692ca06eabb337e09b7e6a8a/9ce64517d7ffbc55-97/s1280x1920/bcd73dc9c2a920a4775c74bd82009c55a82248fd.jpg'
                  alt='avatar'
                  className='w-6 h-6 rounded-full'
                />
                <span className='px-1'>Tobigami</span>
              </div>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className='flex items-center py-2'>
              <Link to='register' className='text-white hover:text-white/70 mx-3'>
                Đăng Ký
              </Link>

              <div className='border-[1px] border-r-white/40 h-4'></div>

              <Link to='login' className='text-white hover:text-white/70 mx-3'>
                Đăng Nhập
              </Link>
            </div>
          )}
        </div>
        <div className='grid grid-cols-12 gap-3 items-center py-2'>
          <div className='col-span-2'>
            <Link to={'/'}>
              <LogoIcon className='fill-white h-8 lg:h-11' />
            </Link>
          </div>
          <form className='col-span-9'>
            <div className='bg-white flex flex-shrink-0 text-black rounded-sm min-w-fit'>
              <input
                type='text'
                placeholder='Tìm kiếm sản phẩm'
                className='p-2 outline-none border-none rounded-sm flex-grow'
                name='search'
              />
              <button className='px-4 m-1 bg-primary rounded-sm cursor-pointer hover:opacity-70'>
                <SearchIcon color='white' />
              </button>
            </div>
          </form>
          <div className='cols-span-1 flex justify-end'>
            <Popover
              // initialState={true}
              renderChildren={
                // container
                <div className='bg-white py-4 px-3 max-w-[400px] text-sm shadow-sm border border-gray-300 rounded-md '>
                  {/* title */}
                  <div className='mt-1 capitalize text-gray-400'>Sản phẩm mới thêm</div>
                  {/* body */}
                  <div className='my-2'>
                    {/* item */}
                    <div className='flex items-center my-4 p-2 hover:bg-neutral-100'>
                      {/* avatar */}
                      <div className='flex-shrink-0 mr-3'>
                        <img
                          className='w-[42px] h-[42px] object-cover'
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
                  <div className='flex justify-between items-center'>
                    <div className='text-gray-400 capitalize'>Thêm vào giỏ hàng</div>
                    <div className='bg-primary rounded-sm hover:opacity-90'>
                      <button className='text-white py-2 px-4 capitalize'>Xem giỏ hàng</button>
                    </div>
                  </div>
                </div>
              }
            >
              <CartIcon className='w-9 h-9 flex-shrink-0 hover:text-gray-300 cursor-pointer' />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
