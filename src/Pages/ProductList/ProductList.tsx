import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import { getCategories } from 'src/apis/categori.api'
import { getProductList } from 'src/apis/products.api'
import Pagination from 'src/components/Pagination'
import { getQueryParams } from 'src/Hooks/GetQueryParams'
import { ProductListConfig, QueryConfig } from 'src/Types/products.type'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SoftProductList from './SoftProductList'

function ProductList() {
  const params: QueryConfig = getQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: params.page || '1',
      limit: params.limit || '5',
      order: params.order,
      sort_by: params.sort_by,
      category: params.category,
      exclude: params.exclude,
      rating_filter: params.rating_filter,
      price_max: params.price_max,
      price_min: params.price_min,
      name: params.name
    },
    isUndefined
  )

  const { data: dataProduct } = useQuery({
    queryKey: ['productList', params],
    queryFn: () => {
      return getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: dataCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })
  return (
    <div className='bg-gray-300'>
      <div className='container py-5'>
        {dataProduct && (
          <div className='min-h-20  grid grid-cols-12 gap-4'>
            {/* Aside Product */}
            <div className='min-h-20 col-span-3'>
              <AsideFilter categories={dataCategories?.data.data || []} queryConfig={queryConfig} />
            </div>
            {/* Product List Body */}
            <div className='min-h-20 col-span-9 bg-gray-300'>
              <SoftProductList pageSize={dataProduct.data.data.pagination.page_size} queryConfig={queryConfig} />
              {/* Product Items Container */}
              <div className='mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {dataProduct?.data.data.products.map((product) => {
                  return (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
              <div className='mt-4 flex items-center justify-center'>
                <Pagination pageSize={dataProduct.data.data.pagination.page_size} queryConfig={queryConfig} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
