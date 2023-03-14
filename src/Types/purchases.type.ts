import { ProductType } from './products.type'

export type PurchasesStatusType = -1 | 1 | 2 | 3 | 4 | 5

export type PurchasesListStatusType = PurchasesStatusType | 0

export interface PurchasesType {
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchasesStatusType
  _id: string
  user: string
  product: ProductType
  createdAt: string
  updatedAt: string
}

export interface ExtendPurchasesType extends PurchasesType {
  disable: boolean
  checked: boolean
}
