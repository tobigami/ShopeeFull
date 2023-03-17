import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import { getPurchasesListApi } from 'src/apis/purchases.api'
import { path } from 'src/Constants/path'
import { purchasesStatus } from 'src/Constants/purchases'
import { GetQueryParams } from 'src/Hooks/GetQueryParams'
import { PurchasesListStatusType } from 'src/Types/purchases.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchasesTabs = [
  { status: purchasesStatus.all, name: 'tất cả' },
  { status: purchasesStatus.inCart, name: 'chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'chờ lấy hàng' },
  { status: purchasesStatus.InProgress, name: 'đang vận chuyển' },
  { status: purchasesStatus.delivered, name: 'đã nhận hàng' },
  { status: purchasesStatus.cancelled, name: 'đơn đã huỷ' }
]

export default function History() {
  const queryParam: { status?: string } = GetQueryParams()
  const status = Number(queryParam.status) || purchasesStatus.all

  const { data } = useQuery({
    queryKey: ['PurchasesListInCart', { status: status }],
    queryFn: () => getPurchasesListApi({ status: status as PurchasesListStatusType })
  })
  const PurchaseList = data?.data.data
  console.log(PurchaseList)

  const purchasesTabsLink = purchasesTabs.map((item) => (
    <Link
      key={item.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({ status: String(item.status) }).toString()
      }}
      className={classNames('flex-1 border-b-[2px] text-center', {
        'border-primary text-primary': status === item.status,
        'border-gray-300 text-black': status !== item.status
      })}
    >
      <div className='py-4 font-medium capitalize '>{item.name}</div>
    </Link>
  ))
  return (
    <div>
      <div className='sticky top-0 flex bg-white'>{purchasesTabsLink}</div>
      <div className='mt-5 flex flex-col bg-white p-5 shadow-sm'>
        {PurchaseList &&
          PurchaseList.map((item) => {
            return (
              <Link
                className='mx-4 mt-4 hover:shadow-sm'
                key={item._id}
                to={`${path.home}${generateNameId({ name: item.product.name, id: item.product._id })}`}
              >
                <div className='flex items-center border border-gray-300 p-3 hover:border-primary'>
                  <div className='mr-4 flex-shrink-0'>
                    <img className='h-[80px] w-[80px] object-cover' src={item.product.image} alt={item.product.name} />
                  </div>

                  <div className='flex-grow'>
                    <div className='flex flex-col items-start justify-evenly'>
                      <div>{item.product.name}</div>
                      <div className='mt-3 text-primary'>x{item.buy_count}</div>
                    </div>
                  </div>

                  <div className='ml-4 flex w-[20%] flex-shrink-0 flex-row justify-start'>
                    <div className='mr-2 text-sm capitalize'>thành tiền:</div>
                    <div className='text-md text-primary'>{formatCurrency(item.buy_count * item.product.price)}</div>
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
