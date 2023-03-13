import { PurchasesListStatusType, PurchasesType } from 'src/Types/purchases.type'
import { SuccessResponseApi } from 'src/Types/utils.type'
import http from 'src/utils/http'

const URL = '/purchases'

export const addToCartApi = (body: { product_id: string; buy_count: number }) => {
  return http.post<SuccessResponseApi<PurchasesType>>(`${URL}/add-to-cart`, body)
}

/**
 *
 * @returns get list Purchases in cart
 */
export const getPurchasesListApi = (params: { status: PurchasesListStatusType }) => {
  return http.get<SuccessResponseApi<PurchasesType[]>>(URL, {
    params
  })
}

// update purchases
export const updatePurchaseApi = (body: { product_id: string; buy_count: number }) => {
  return http.put<SuccessResponseApi<PurchasesType>>(`${URL}/update-purchase`, body)
}

// buy purchases
export const buyPurchasesApi = (body: { product_id: string; buy_count: number }[]) => {
  return http.post<SuccessResponseApi<PurchasesType[]>>(`${URL}/buy-products`, body)
}

// deletePurchases
export const deletePurchasesApi = (id: string[]) => {
  return http.delete<SuccessResponseApi<{ deleted_count: number }>>(URL, {
    data: id
  })
}
