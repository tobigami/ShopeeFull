import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import React, { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { buyPurchasesApi, deletePurchasesApi, getPurchasesListApi, updatePurchaseApi } from 'src/apis/purchases.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { path } from 'src/Constants/path'
import { purchasesStatus } from 'src/Constants/purchases'
import { AppContext } from 'src/Contexts/app.contexts'
import { PurchasesType } from 'src/Types/purchases.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

export default function Cart() {
  const queryClient = useQueryClient()
  const { ExtendPurchases, setExtendPurchases } = useContext(AppContext)
  const { data: dataPurchases, refetch } = useQuery({
    queryKey: ['PurchasesListInCart', { status: purchasesStatus.inCart }],
    queryFn: () => getPurchasesListApi({ status: purchasesStatus.inCart }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchasesList', { status: purchasesStatus.inCart }] })
    }
  })
  const purchasesList = dataPurchases?.data.data

  const location = useLocation()
  const purchaseIdFromBuyNow = (location.state as { purchaseId: string | null })?.purchaseId

  useEffect(() => {
    setExtendPurchases((pre) => {
      const temp = keyBy(pre, '_id')
      return (
        purchasesList?.map((item) => {
          const isPurchaseFromBuyNow = purchaseIdFromBuyNow === item._id
          return { ...item, disable: false, checked: isPurchaseFromBuyNow || Boolean(temp[item._id]?.checked) }
        }) || []
      )
    })
  }, [purchasesList, purchaseIdFromBuyNow, setExtendPurchases])

  useEffect(() => {
    // clear up function reset location state khi f5
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const purchasesCheckedList = ExtendPurchases.filter((item) => item.checked)
  const purchasesCheckedListLength = purchasesCheckedList.length
  const totalPricePurchaseChecked = useMemo(
    () =>
      purchasesCheckedList.reduce((result, current) => {
        return result + current.price * current.buy_count
      }, 0),
    [purchasesCheckedList]
  )

  const totalPriceSavingPurchaseChecked = useMemo(
    () =>
      purchasesCheckedList.reduce((result, current) => {
        return result + (current.price_before_discount - current.price) * current.buy_count
      }, 0),
    [purchasesCheckedList]
  )

  const handleCheck = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendPurchases(
      produce((draft) => {
        draft[index].checked = e.target.checked
      })
    )
  }
  const isCheckAll = useMemo(() => ExtendPurchases.every((item) => item.checked), [ExtendPurchases])
  const handleCheckAll = () => {
    setExtendPurchases(
      produce((draft) => {
        draft.map((item) => {
          return (item.checked = !isCheckAll)
        })
      })
    )
  }

  const UpdatePurchases = useMutation({
    mutationFn: updatePurchaseApi,
    onSuccess: () => refetch()
  })

  const DeletePurchases = useMutation({
    mutationFn: deletePurchasesApi,
    onSuccess: () => {
      // g???i l???i api purchasesList ????? c???p nh???t s??? hi???n th??? trong gi??? h??ng
      queryClient.invalidateQueries({ queryKey: ['purchasesList', { status: purchasesStatus.inCart }] })
      refetch()
    }
  })

  const BuyPurchases = useMutation({
    mutationFn: buyPurchasesApi,
    onSuccess: () => refetch()
  })

  const handleQuantity = (index: number, value: number, isEnable: boolean) => {
    const oldValue = (purchasesList as PurchasesType[])[index].buy_count
    if (isEnable && oldValue !== value) {
      const purchases = ExtendPurchases[index]
      setExtendPurchases(
        produce((draft) => {
          draft[index].disable = true
        })
      )
      UpdatePurchases.mutate({ product_id: purchases.product._id, buy_count: value })
    }
  }

  const handleOnType = (index: number) => (value: number) => {
    setExtendPurchases(
      produce((draft) => {
        draft[index].buy_count = value
      })
    )
  }

  const handleDeletePurchase = (id: string) => () => {
    DeletePurchases.mutate([id])
  }
  const handleDeleteManyPurchase = () => {
    if (purchasesCheckedListLength > 0) {
      const params = purchasesCheckedList.map((item) => item._id)
      DeletePurchases.mutate(params)
    }
  }

  const handleBuyPurchases = () => {
    const params = purchasesCheckedList.map((item) => {
      return {
        product_id: item.product._id,
        buy_count: item.buy_count
      }
    })
    BuyPurchases.mutate(params, {
      onSuccess: (data) => {
        console.log(data)
        toast.success(data.data.message)
      }
    })
  }
  if (!purchasesList) return null
  return (
    <div className='bg-gray-300 py-4'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            {/* header */}
            <div className='mb-4 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white p-6 capitalize shadow-sm'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='mr-6 flex-shrink-0 items-center justify-center'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-primary'
                      onChange={handleCheckAll}
                      checked={isCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-sm'>S???n ph???m</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='text-s col-span-2 text-sm text-gray-400'>????n gi??</div>
                  <div className='text-s col-span-1 text-sm text-gray-400'>s??? l?????ng</div>
                  <div className='text-s col-span-1 text-sm text-gray-400'>s??? ti???n</div>
                  <div className='text-s col-span-1 text-sm text-gray-400'>thao t??c</div>
                </div>
              </div>
            </div>
            {/* body */}
            {purchasesList.length > 0 ? (
              <div className='bg-white p-3'>
                {ExtendPurchases.map((item, index) => {
                  return (
                    <div
                      key={item._id}
                      className='mt-3 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white p-3 capitalize shadow-sm'
                    >
                      <div className='col-span-6'>
                        <div className='flex items-center'>
                          <div className='mr-6 flex-shrink-0 items-center justify-center'>
                            <input
                              type='checkbox'
                              className='h-5 w-5 accent-primary'
                              checked={item.checked}
                              onChange={handleCheck(index)}
                            />
                          </div>
                          <Link
                            to={`${path.home}${generateNameId({ name: item.product.name, id: item.product._id })}`}
                            className='flex-grow'
                          >
                            <div className='flex items-center'>
                              <div className='h-20 w-20 flex-shrink-0 rounded-sm'>
                                <img src={item.product.image} alt={item.product.image} />
                              </div>
                              <div className='flex-grow px-4 pt-1 pb-2'>
                                <div className='line-clamp-2'>{item.product.name}</div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className='grid grid-cols-5 items-center text-center'>
                          <div className='col-span-2 text-sm text-gray-400'>
                            <div className='flex items-center justify-center text-xs'>
                              <span className='px-2 line-through'>{formatCurrency(item.price_before_discount)}</span>
                              <span className='px-2 text-black'>{formatCurrency(item.price)}</span>
                            </div>
                          </div>
                          <div className='col-span-1'>
                            {/* <span>test di test lai van the</span> */}
                            <QuantityController
                              max={item.product.quantity}
                              value={item.buy_count}
                              onIncrease={(value) => handleQuantity(index, value, value <= item.product.quantity)}
                              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                              onType={handleOnType(index)}
                              classWrapper='justify-center'
                              disabled={item.disable}
                              onFocusOut={(values) =>
                                handleQuantity(index, values, values <= item.product.quantity && values >= 1)
                              }
                            />
                          </div>
                          <div className='col-span-1 text-sm text-primary'>
                            <span>{formatCurrency(item.buy_count * item.price)}</span>
                          </div>
                          <button
                            onClick={handleDeletePurchase(item._id)}
                            className='text-s col-span-1 text-sm text-black'
                          >
                            Xo??
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center'>
                <div>
                  <img src='src/assets/Image/no-product.png' alt='1' />
                </div>
                <div className='mt-4 text-xl capitalize text-black'>Gi??? h??ng c???a b???n tr???ng</div>

                <Link
                  to={'/'}
                  className='text-md mt-4 rounded-sm bg-primary px-8 py-4 uppercase text-white hover:cursor-pointer hover:bg-primary/70'
                >
                  Mua ngay
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* bottom */}
        <div className='sticky bottom-0 mt-8 rounded-sm border border-gray-400 shadow-sm'>
          <div className='flex flex-col items-start rounded-sm bg-white sm:flex-row sm:items-center sm:justify-between sm:py-5'>
            <div className='flex items-center capitalize'>
              <div className='flex items-center justify-center p-6'>
                <input
                  type='checkbox'
                  className='h-5 w-5 accent-primary'
                  onChange={handleCheckAll}
                  checked={isCheckAll}
                />
              </div>
              <button className='px-3 capitalize' onClick={handleCheckAll}>
                ch???n t???t c??? ({ExtendPurchases.length})
              </button>
              <div className='px-3'>
                <button onClick={handleDeleteManyPurchase}>Xo??</button>
              </div>
            </div>
            <div className='flex flex-col items-start px-4 py-4 sm:flex-row sm:items-center sm:px-0 sm:py-0'>
              <div className='flex flex-col capitalize'>
                <div className='flex flex-col items-start sm:flex-row sm:items-center'>
                  <div className='mr-4'>t???ng thanh to??n s???n ph???m ({purchasesCheckedListLength} s???n ph???m):</div>
                  <div className='text-2xl text-primary'>{formatCurrency(totalPricePurchaseChecked)}</div>
                </div>
                <div className='mt-2 flex flex-col items-start justify-center sm:mt-0 sm:flex-row sm:items-center sm:justify-start'>
                  <div className='mr-4'>ti???t ki???m:</div>
                  <div className='text-sm text-primary'>{formatCurrency(totalPriceSavingPurchaseChecked)}</div>
                </div>
              </div>
              <div className='mt-4 sm:mt-0 sm:px-4'>
                <Button
                  className='rounded-sm bg-primary px-[60px] py-3 uppercase text-white'
                  onClick={handleBuyPurchases}
                  disabled={BuyPurchases.isLoading}
                >
                  Mua
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
