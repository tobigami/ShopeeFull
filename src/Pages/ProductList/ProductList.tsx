import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { getCategories } from 'src/apis/category.api'
import { getProductList } from 'src/apis/products.api'
import Pagination from 'src/components/Pagination'
import { UseQueryConfig } from 'src/Hooks/useQueryConfig'
import { ProductListConfig } from 'src/Types/products.type'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SoftProductList from './components/SoftProductList'

function ProductList() {
  const queryConfig = UseQueryConfig()

  const { data: dataProduct } = useQuery({
    queryKey: ['productList', queryConfig],
    queryFn: () => {
      return getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: dataCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  return (
    <div className='bg-gray-300'>
      <Helmet>
        <title>Trang chủ | Shopee</title>
        <meta name='productList' content='Trang chủ shopee' />
      </Helmet>
      <div className='container py-2 sm:py-5'>
        {dataProduct && (
          <div className='min-h-20  grid grid-cols-12 gap-1 sm:gap-4'>
            {/* Aside Product */}
            <div className='min-h-20 col-span-12 sm:col-span-3 sm:block'>
              <AsideFilter categories={dataCategories?.data.data || []} queryConfig={queryConfig} />
            </div>
            {/* Product List Body */}
            <div className='min-h-20 col-span-12 bg-gray-300 sm:col-span-9'>
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
