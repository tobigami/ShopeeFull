import { Link } from 'react-router-dom'
import StarRatting from 'src/components/StarRatting'
import { ProductType } from 'src/Types/products.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
interface Props {
  product: ProductType
}

function Product({ product }: Props) {
  return (
    <Link to='/'>
      {/* container */}
      <div className='bg-white  hover:shadow-lg overflow-hidden rounded-sm hover:translate-y-[-2px] transition-transform duration-200'>
        <div className='pt-[100%] w-full relative'>
          <img className='absolute top-0 left-0 object-cover w-full h-full' src={product.image} alt={product.name} />
        </div>
        {/* description */}
        <div className='p-2 overflow-hidden'>
          <div className='text-black text-xs line-clamp-2 min-h-[32px]'>{product.name}</div>
          {/* price */}
          <div className='flex items-center flex-row mt-2'>
            <div className='text-sm flex items-end line-through overflow-hidden'>
              <span className='leading-4'>₫</span>
              <span className='truncate'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='text-md flex items-end text-primary ml-3 overflow-hidden'>
              <span className='leading-3'>₫</span>
              <span className='truncate'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          {/* star */}
          <div className='mt-3 flex justify-end items-center'>
            {/* <div className='relative flex'>
              <div className='absolute top-0 left-0 h-full overflow-hidden ' style={{ width: '50%' }}>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='w-3 h-3 fill-yellow-300 text-yellow-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='w-3 h-3 fill-current text-gray-300'
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div> */}
            <StarRatting ratting={product.rating} />
            <div className='ml-1 flex items-end justify-start relative top-[1.5px] text-[12px]'>
              <span className='mr-1'>Đã bán</span>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
