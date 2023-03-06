import { ProductListConfig, ProductListType, ProductType } from 'src/Types/products.type'
import { SuccessResponseApi } from 'src/Types/utils.type'
import http from 'src/utils/http'
const URL = '/products'
export const getProductList = (params: ProductListConfig) => {
  return http.get<SuccessResponseApi<ProductListType>>(URL, {
    params
  })
}

export const getProductDetail = (id: string) => {
  return http.get<SuccessResponseApi<ProductType>>(`${URL}/${id}`)
}
