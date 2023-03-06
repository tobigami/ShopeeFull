import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { path } from 'src/Constants/path'

function AsideFilter() {
  return (
    // container
    <div className='px-2 py-3'>
      <Link to={path.home} className='flex flex-row items-center font-bold'>
        {/* bar Icon */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 mr-2'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
        <span className=''>Tất cả danh mục</span>
      </Link>
      {/* fake border */}
      <div className='bg-gray-400 h-[1px] w-full my-4'></div>
      <ul className='text-sm'>
        <Link to={path.home} className='flex flex-row items-center text-primary mb-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-3 h-3 mr-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
            />
          </svg>
          <span className='font-bold'>Linh kiện Máy tính</span>
        </Link>
        <li>
          <Link to={path.home} className='block py-0.25 px-5'>
            Màn hình
          </Link>
        </li>
        <li>
          <Link to={path.home} className='block py-0.25 px-5'>
            Cpu
          </Link>
        </li>
      </ul>
      {/* Search Filter toolbox */}
      <Link to={'/'} className='flex items-center flex-row mt-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4 mr-[4px]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>
        <span className='font-bold text-sm'>Bộ lọc tìm kiếm</span>
      </Link>
      {/* fake border */}
      <div className='bg-gray-400 h-[1px] w-full my-4'></div>
      {/* Khoang gia */}
      <form>
        <div className='my-5'>Khoảng giá</div>
        <div className='flex flex-row items-center justify-center'>
          <Input
            classInput='text-sm border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-6 p-1 outline-none'
            className='grow'
            placeholder='From'
            name='Form'
            type='text'
            classError='hidden'
          />
          <div className='mx-2 flex-shrink-0'>-</div>
          <Input
            classInput='text-sm border border-gray-300 focus:border-gray-500 focus:shadow-sm w-full h-6 p-1 outline-none'
            className='grow'
            placeholder='To'
            name='Form'
            type='text'
            classError='hidden'
          />
        </div>
        <Button className='rounded-sm mt-4 flex items-center justify-center w-full text-white bg-primary p-2 hover:opacity-90'>
          Áp dụng
        </Button>
      </form>
      {/* fake border */}
      <div className='bg-gray-400 h-[1px] w-full my-4'></div>
      {/* Danh gia */}
      <div className='text-sm'>Đánh giá</div>
      <ul>
        <li>
          <Link to={path.home} className='flex items-center'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <svg
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-4 h-4 mr-1'
                    color='yellow'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                      clipRule='evenodd'
                    />
                  </svg>
                )
              })}
            <span className='text-sm ml-5'>Trở lên</span>
          </Link>
        </li>
        <li>
          <Link to={path.home} className='flex items-center'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <svg
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-4 h-4 mr-1'
                    color='red'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                      clipRule='evenodd'
                    />
                  </svg>
                )
              })}
            <span className='text-sm ml-5'>Trở lên</span>
          </Link>
        </li>
      </ul>

      {/* fake border */}
      <div className='bg-gray-400 h-[1px] w-full my-4'></div>
      <Button className='rounded-sm mt-4 flex items-center justify-center w-full text-white bg-primary p-2 hover:opacity-90 capitalize'>
        Xoá tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
