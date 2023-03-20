import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React from 'react'
import { Helmet } from 'react-helmet-async'
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

  const purchasesTabsLink = purchasesTabs.map((item) => (
    <Link
      key={item.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({ status: String(item.status) }).toString()
      }}
      className={classNames('flex-shrink-0 border-b-[2px] border-t-[2px] text-center sm:flex-1', {
        'border-primary text-primary': status === item.status,
        'border-transparent text-black': status !== item.status
      })}
    >
      <div className=' py-1 px-3 text-sm capitalize sm:px-2 sm:py-4 sm:text-base'>{item.name}</div>
    </Link>
  ))
  return (
    <div>
      <Helmet>
        <title>Đơn mua | Shopee Clone</title>
        <meta name='history purchases' content='đơn hàng của bạn' />
      </Helmet>
      {/* header */}
      <div className='scrollbar-hidden sticky top-0 flex overflow-x-auto bg-white'>{purchasesTabsLink}</div>
      {/* body */}
      <div className=' mt-2 flex flex-col bg-white shadow-sm  sm:mt-6'>
        {PurchaseList &&
          PurchaseList.map((item) => {
            return (
              <Link
                className='mx-2 mt-2 last:mb-2 hover:shadow-sm sm:mx-4 sm:mt-5 sm:last:mb-5'
                key={item._id}
                to={`${path.home}${generateNameId({ name: item.product.name, id: item.product._id })}`}
              >
                <div className='flex items-center border border-gray-300 p-1 hover:border-primary sm:p-3'>
                  <div className='mr-4 flex-shrink-0'>
                    <img className='h-[80px] w-[80px] object-cover' src={item.product.image} alt={item.product.name} />
                  </div>

                  <div className='flex flex-grow flex-col justify-between sm:flex-row'>
                    <div className='flex flex-col items-start justify-evenly text-xs sm:text-lg'>
                      <div className='line-clamp-2'>{item.product.name}</div>
                      <div className='mt-1 text-primary sm:mt-3'>x{item.buy_count}</div>
                    </div>

                    <div className='flex flex-shrink-0 flex-row justify-start sm:ml-4 sm:flex sm:w-[20%] sm:flex-row'>
                      <div className='mr-2 text-xs capitalize sm:text-base'>thành tiền:</div>
                      <div className='text-xs text-primary sm:text-base'>
                        {formatCurrency(item.buy_count * item.product.price)}
                      </div>
                    </div>
                  </div>

                  {/* <div className='ml-4 hidden w-[20%] flex-shrink-0 flex-row justify-start sm:flex'>
                    <div className='mr-2 text-sm capitalize'>thành tiền:</div>
                    <div className='text-md text-primary'>{formatCurrency(item.buy_count * item.product.price)}</div>
                  </div> */}
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
