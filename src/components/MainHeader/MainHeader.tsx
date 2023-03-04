import { Link } from 'react-router-dom'
import { CartIcon, ChevronIcon, GlobalIcon, LogoIcon, SearchIcon } from 'src/Icons'
import Popover from '../Popover'

function MainHeader() {
  return (
    <div className='bg-primary text-white text-sm'>
      <div className='container'>
        <div className='flex justify-end'>
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

          <Popover
            renderChildren={
              <div className='bg-white border border-gray-200 shadow-sm py-2 px-3 rounded-sm'>
                <Link to={'/'} className='block py-2 px-2  hover:text-emerald-400'>
                  Tài khoản của tôi
                </Link>
                <Link to={'/'} className='block py-2 px-2  hover:text-emerald-400'>
                  Đơn mua
                </Link>
                <div className='py-2 px-2'>
                  <button className='text-left w-full hover:text-emerald-400'>Đăng xuất</button>
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
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className='cols-span-1 flex justify-end'>
            <CartIcon className='w-9 h-9 flex-shrink-0 hover:text-gray-300 cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
