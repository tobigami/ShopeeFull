import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProductDetail } from 'src/apis/products.api'
import StarRatting from 'src/components/StarRatting'
import { formatCurrency, formatNumberToSocialStyle, saleValue } from 'src/utils/utils'
import InputNumber from 'src/components/InputNumber'
import DOMPurify from 'dompurify'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: dataProductDetail } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail(id as string)
  })
  const product = dataProductDetail?.data.data

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const chooseActiveImage = (img: string) => {
    setActiveImage(img)
  }
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])
  const currentImages = useMemo(() => {
    return product ? product.images.slice(...currentIndexImages) : []
  }, [product, currentIndexImages])
  const nextImage = () => {
    if (product && currentIndexImages[1] < product.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prevImage = () => {
    if (product && currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const refImage = useRef<HTMLImageElement | null>(null)
  const handleZoomImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // lấy giá trị của toạ độ và độ dài của thẻ div theo window
    const rect = e.currentTarget.getBoundingClientRect()
    /**
     * lấy toạ độ của chuột từ element target lưu ý cách này dùng khi đã sử lý được sự kiển nổi bọt
     * nếu không sử lý được sự kiện nổi bọt thì offsetX offsetY được xác định như sau
     * offsetX = e.pageX - (rect.x + window.scrollX)
     * offsetY = e.pageY - (react.y + window.scrollY)
     */
    const { offsetX, offsetY } = e.nativeEvent

    // lấy ra img từ ref
    const image = refImage.current as HTMLImageElement
    // lấy kích thước ảnh gốc
    const { naturalHeight, naturalWidth } = image
    // style đưa ảnh về kích thước gốc khi hover chuột vào
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    refImage.current?.removeAttribute('style')
  }
  if (!product) return null
  return (
    <div className=' bg-gray-300 py-8 '>
      <div className='container'>
        <div className='grid grid-cols-12 gap-9 rounded-sm bg-white py-10 px-10 shadow-sm'>
          {/* anh san phẩm */}
          <div className='col-span-5'>
            <div
              onMouseMove={handleZoomImage}
              onMouseLeave={handleRemoveZoom}
              className='relative w-full cursor-zoom-in overflow-hidden border border-gray-300 pt-[100%] shadow-sm'
            >
              <img
                ref={refImage}
                src={activeImage}
                alt={product?.name}
                className='pointer-events-none absolute top-0 left-0 bg-white object-cover'
              />
            </div>
            <div className='relative mt-6 grid grid-cols-5 gap-4'>
              {/* left btn */}
              <button
                onClick={prevImage}
                className='absolute left-0 top-1/2 z-10 h-6 w-5 -translate-y-1/2 bg-black/20 text-green-500 outline-none hover:bg-black/50'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </button>
              {/* 5 image */}
              {currentImages.slice(0, 5).map((img) => {
                const isActive = img === activeImage
                return (
                  <div
                    aria-hidden={true}
                    onClick={() => chooseActiveImage(img)}
                    key={img}
                    className='relative col-span-1 w-full pt-[100%] shadow'
                  >
                    <img src={img} alt={img} className='absolute top-0 left-0 bg-white object-cover' />
                    {isActive && <div className='absolute inset-0 border-2 border-primary' />}
                  </div>
                )
              })}
              {/* right btn */}
              <button
                onClick={nextImage}
                className='absolute right-0 top-1/2 z-10 h-6 w-5 -translate-y-1/2 bg-black/20 text-green-500 outline-none hover:bg-black/50'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
          {/* mo ta san phẩm */}
          <div className='col-span-7'>
            <h1 className='text-2xl font-medium'>{product?.name}</h1>
            <div className='mt-4 flex items-center'>
              <div className='pt-[4px] font-[700] text-primary '>{product?.rating}</div>
              <div className='ml-2'>
                <StarRatting
                  ratting={product?.rating}
                  activeClass='h-4 w-4 fill-primary text-primary'
                  nonActiveClass='h-4 w-4 fill-gray-500 text-gray-500'
                />
              </div>
              <div className='mx-2 h-4 w-[2px] bg-gray-400'></div>
              {/* rating */}
              <div className='text-md'>
                {formatNumberToSocialStyle(product.sold)}
                <span className='ml-2 text-sm text-gray-500'>Đã bán</span>
              </div>
            </div>
            {/* price */}
            <div className='mt-12 flex items-center'>
              <span className='text-md line-through'>{formatCurrency(product.price_before_discount)}</span>
              <span className='ml-3 text-4xl font-[500] text-primary'>{formatCurrency(product.price)}</span>
              <div className='ml-3 rounded-sm bg-primary py-[4px] px-2 text-[12px] uppercase text-white shadow-sm'>
                {saleValue(product.price_before_discount, product.price)}% Giảm
              </div>
            </div>
            {/* so lượng san phẩm */}
            <div className='mt-12 flex items-center'>
              <span className='text-md text-gray-400'>số lượng</span>
              <div className='ml-4 flex items-center'>
                <button className='flex h-7 w-7 items-center justify-center rounded-sm border border-gray-400 bg-white shadow-sm hover:bg-white/70'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                  </svg>
                </button>
                <InputNumber
                  value={1}
                  // className='mx-1'
                  classError='hidden'
                  classInput='h-7 w-14  border-t border-b border-gray-400 text-center outline-none'
                />
                <button className='shadow-xm flex h-7 w-7 items-center justify-center rounded-sm border border-gray-400 bg-white hover:bg-white/70'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                  </svg>
                </button>
              </div>
              <span className='text-md ml-4 text-gray-400'>{product.quantity} sản phẩm có sẵn</span>
            </div>
            {/* them vao gio hang, mua ngay */}
            <div className='mt-12 flex items-center'>
              <button className='flex items-center justify-center rounded-sm border border-primary bg-primary/10 py-3 px-3 text-lg capitalize text-primary shadow-sm hover:bg-primary/5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='mr-2 h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                <span>Thêm vào giỏ hàng</span>
              </button>

              <button className='ml-4 flex items-center justify-center rounded-sm border border-primary bg-primary py-3 px-3 text-lg capitalize text-white shadow-sm hover:bg-primary/70'>
                <span>mua ngay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 py-4'>
        <div className='container'>
          <div className='rounded-sm bg-white py-6 px-6 shadow-sm'>
            <h1 className='rounded-sm bg-gray-200 px-2 py-3 text-lg font-medium uppercase'>chi tiết sản phẩm</h1>
            <div className='my-2 mx-2 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
