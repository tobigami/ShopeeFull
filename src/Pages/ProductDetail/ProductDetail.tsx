import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetail, getProductList } from 'src/apis/products.api'
import StarRatting from 'src/components/StarRatting'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, saleValue } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { ProductListConfig } from 'src/Types/products.type'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import { addToCartApi } from 'src/apis/purchases.api'
import { toast } from 'react-toastify'
import { purchasesStatus } from 'src/Constants/purchases'
import { path } from 'src/Constants/path'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'

interface InputAddToCart {
  product_id: string
  buy_count: number
}

export default function ProductDetail() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(1)
  const handleBuyCount = (value: number) => {
    return setBuyCount(value)
  }
  // nameId là pathProduct thì mới get được params
  const { nameId } = useParams()

  const id = getIdFromNameId(nameId as string)
  const { data: dataProductDetail } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail(id as string)
  })
  const product = dataProductDetail?.data.data
  // handle add to cart
  const addToCart = useMutation({
    mutationFn: (body: InputAddToCart) => addToCartApi(body)
  })

  const handleAddToCart = () => {
    addToCart.mutate(
      { product_id: product?._id as string, buy_count: buyCount },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['purchasesList', { status: purchasesStatus.inCart }] })
          toast.success(data.data.message)
        }
      }
    )
  }

  const buyNow = async () => {
    const res = await addToCart.mutateAsync({ product_id: product?._id as string, buy_count: buyCount })
    navigate(path.cart, {
      state: {
        purchaseId: res.data.data._id
      }
    })
  }

  const queryConfig: ProductListConfig = { page: 1, limit: 20, category: product?.category._id }
  // gọi api productList để làm danh sách sản phẩm tương tự
  const { data } = useQuery({
    queryKey: ['ProductList', queryConfig],
    queryFn: () => getProductList(queryConfig),
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

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
     * lấy toạ độ của chuột từ element target lưu ý cách này dùng khi đã sử lý được sự kiện nổi bọt
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
    <div className=' bg-gray-300 py-2 sm:py-8 '>
      <Helmet>
        <title>{product.name}</title>
        <meta
          name='product detail'
          content={convert(product.description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>
      {/* hình ảnh phẩm */}
      <div className='container'>
        <div className='grid grid-cols-12 gap-2 rounded-sm bg-white p-2 shadow-sm sm:gap-9 sm:p-10'>
          {/* anh san phẩm */}
          <div className='col-span-12 sm:col-span-5'>
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
                    <img src={img} alt={img} className='absolute top-0 left-0 h-full w-full bg-white object-contain' />
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
          <div className='col-span-12 sm:col-span-7'>
            <h1 className='text-xl font-medium sm:text-2xl'>{product?.name}</h1>
            <div className='mt-2 flex items-center sm:mt-4'>
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
            <div className='mt-2 flex flex-col items-start sm:mt-12 sm:flex-row sm:items-center'>
              <span className='text-md line-through'>{formatCurrency(product.price_before_discount)}</span>
              <span className='text-4xl font-[500] text-primary sm:ml-3'>{formatCurrency(product.price)}</span>
              <div className='rounded-sm bg-primary py-[4px] px-2 text-[12px] uppercase text-white shadow-sm sm:ml-3'>
                {saleValue(product.price_before_discount, product.price)}% Giảm
              </div>
            </div>
            {/* so lượng san phẩm */}
            <div className='mt-2 flex items-center sm:mt-12'>
              <span className='sm:text-md text-sx mr-4 hidden text-gray-400 sm:block'>số lượng</span>
              <QuantityController
                value={buyCount}
                max={product.quantity}
                onIncrease={handleBuyCount}
                onDecrease={handleBuyCount}
                onType={handleBuyCount}
              />
              <span className='sm:text-md ml-4 text-sm text-gray-400'>{product.quantity} sản phẩm có sẵn</span>
            </div>
            {/* them vao gio hang, mua ngay */}
            <div className='mt-2 flex items-center sm:mt-12'>
              <button
                onClick={handleAddToCart}
                className='flex items-center justify-center rounded-sm border border-primary bg-primary/10 p-0.5 text-lg capitalize text-primary shadow-sm hover:bg-primary/5 sm:p-3'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 sm:mr-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                <span className='sm:text-md text-sm'>Thêm vào giỏ hàng</span>
              </button>

              <button
                onClick={buyNow}
                className='ml-2 flex flex-grow items-center justify-center rounded-sm border border-primary bg-primary px-1 py-0.5 text-lg capitalize text-white shadow-sm hover:bg-primary/70 sm:ml-4 sm:p-3'
              >
                <span className='text-sm sm:text-sm'>mua ngay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mô tả sản phẩm */}
      <div className='mt-2 py-2 sm:mt-8 sm:py-4'>
        <div className='container'>
          <div className='rounded-sm bg-white p-6 shadow-sm'>
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

      <div className='mt-4'>
        <div className='container'>
          <div className='mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {data?.data.data.products.map((product) => {
              return (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
