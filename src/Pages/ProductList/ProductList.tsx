import { useQuery } from '@tanstack/react-query'
import { getProductList } from 'src/apis/products.api'
import { getQueryParams } from 'src/Hooks/GetQueryParams'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SoftProductList from './SoftProductList'

function ProductList() {
  const params = getQueryParams()
  const { data } = useQuery({
    queryKey: ['productList', params],
    queryFn: () => {
      return getProductList(params)
    }
  })
  return (
    <div className='bg-gray-300'>
      <div className='container py-5'>
        <div className='min-h-20  grid grid-cols-12 gap-4'>
          {/* Aside Product */}
          <div className='min-h-20 col-span-3'>
            <AsideFilter />
          </div>
          {/* Product List Body */}
          <div className='min-h-20 bg-gray-300 col-span-9'>
            <SoftProductList />
            {/* Product Items Container */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-3'>
              {data &&
                data?.data.data.products.map((product) => {
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
    </div>
  )
}

export default ProductList
