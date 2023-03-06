function SoftProductList() {
  return (
    <div className='bg-[#ededed]'>
      <div className='flex items-center flex-wrap justify-between p-5'>
        <div className='flex items-center justify-center gap-2'>
          <div className='text-sm text-gray-500'>Sắp sếp theo</div>
          <button className='px-5 py-2 bg-primary hover:bg-primary/90 text-sm text-white rounded-sm shadow-sm'>
            Phổ biến
          </button>
          <button className='px-5 py-2 bg-white hover:bg-slate-200/90 text-sm text-black rounded-sm shadow-sm'>
            Mới nhất
          </button>
          <button className='px-5 py-2 bg-white hover:bg-slate-200/90 text-sm text-black rounded-sm shadow-sm'>
            Bán chạy
          </button>
          <select
            className='bg-white px-4 py-2 text-sm text-left outline-none hover:bg-slate-200 capitalize'
            defaultValue=''
          >
            <option disabled value=''>
              Giá
            </option>
            <option>Giá: thấp đến cao</option>
            <option>Giá: cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div className='px-4'>
            <span className='text-primary'>1</span>
            <span className='px-1'>/</span>
            <span>9</span>
          </div>
          <div className='flex items-center'>
            <button
              disabled
              className='bg-white hover:bg-slate-200 px-2 py-2 rounded-sm text-center flex items-center mr-0.5 outline-none disabled:cursor-not-allowed disabled:bg-slate-300'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='bg-white hover:bg-slate-200 px-2 py-2 rounded-sm text-center flex items-center outline-none disabled:cursor-not-allowed disabled:bg-slate-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoftProductList
