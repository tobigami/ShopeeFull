import { Link } from 'react-router-dom'
import StarRatting from 'src/components/StarRatting'
import { path } from 'src/Constants/path'
import { ProductType } from 'src/Types/products.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'
interface Props {
  product: ProductType
}

function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      {/* container */}
      <div className='rounded-sm bg-white transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-lg'>
        <div className='relative w-full pt-[100%]'>
          <img className='absolute top-0 left-0 h-full w-full object-cover' src={product.image} alt={product.name} />
        </div>
        {/* description */}
        <div className='overflow-hidden p-1 sm:p-2'>
          <div className='min-h-[32px] text-xs text-black line-clamp-2'>{product.name}</div>
          {/* price */}
          <div className='flex flex-row-reverse items-end justify-between sm:block'>
            <div className='mt-2 flex flex-col items-end sm:flex-row sm:items-start sm:justify-end'>
              <div className='flex items-end overflow-hidden text-sm line-through'>
                <span className='truncate'>{formatCurrency(product.price_before_discount)}</span>
              </div>
              <div className='text-md ml-1 flex items-end overflow-hidden text-primary sm:ml-3'>
                <span className='truncate'>{formatCurrency(product.price)}</span>
              </div>
            </div>
            {/* star */}
            <div className='mt-2 flex flex-col items-start sm:mt-3 sm:flex-row sm:items-end sm:justify-end'>
              <StarRatting ratting={product.rating} />
              <div className='relative top-[1.5px] ml-1 mb-[2px] flex items-end justify-start text-[12px] sm:mb-0'>
                <span className='mr-0.5'>Đã bán</span>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
