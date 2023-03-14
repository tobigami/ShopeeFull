import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/Constants/path'
import { AppContext } from 'src/Contexts/app.contexts'
import { CartIcon, LogoIcon, SearchIcon } from 'src/Icons'
import Popover from '../Popover'
import { purchasesStatus } from 'src/Constants/purchases'
import { getPurchasesListApi } from 'src/apis/purchases.api'
import { formatCurrency } from 'src/utils/utils'
import useSearchProduct from 'src/Hooks/useSearchProduct'
import NavHeader from '../NavHeader'

function MainHeader() {
  const maxPurchases = 5
  const { isAuthenticated } = useContext(AppContext)

  // handle search submit
  const { register, handleOnSubmit } = useSearchProduct()

  // get purchasesList
  /**
   * khi chúng ta chuyển trang thì main header chị bị re-render chứ k bị
   * unmount và mounting lại
   * trừ trường hợp logout và nhảy sang login hoặc register
   * nên những query này sẽ k bị inActive => không bị gọi lại, vì thế
   * k cần cần set stale time
   */
  const { data: PurchasesList } = useQuery({
    queryKey: ['purchasesList', { status: purchasesStatus.inCart }],
    queryFn: () => getPurchasesListApi({ status: purchasesStatus.inCart }),
    // chỉ get api purchasesList khi đã đăng nhập vì cần access token khi gọi api này
    enabled: isAuthenticated
  })

  return (
    <div className='bg-primary text-sm text-white'>
      <div className='container'>
        <NavHeader />
        <div className='grid grid-cols-12 items-center gap-3 py-2'>
          <div className='col-span-2'>
            <Link to={'/'}>
              <LogoIcon className='h-8 fill-white lg:h-11 ' />
            </Link>
          </div>
          {/* search input */}
          <form onSubmit={handleOnSubmit} className='col-span-9'>
            <div className='flex min-w-fit flex-shrink-0 rounded-sm bg-white text-black'>
              <input
                type='text'
                placeholder='Tìm kiếm sản phẩm'
                className='flex-grow rounded-sm border-none p-2 outline-none'
                {...register('name')}
              />
              <button className='m-1 cursor-pointer rounded-sm bg-primary px-4 hover:opacity-70'>
                <SearchIcon color='white' />
              </button>
            </div>
          </form>
          <div className='cols-span-1 flex justify-end'>
            <Popover
              // initialState={true}
              renderChildren={
                // container
                <div className='max-w-[400px] rounded-md border border-gray-300 bg-white py-4 px-3 text-sm shadow-sm '>
                  {/* title */}
                  <div className='mt-1 capitalize text-gray-400'>Sản phẩm mới thêm</div>

                  {PurchasesList && PurchasesList.data.data.length > 0 ? (
                    PurchasesList.data.data.slice(0, maxPurchases).map((item) => {
                      return (
                        <div key={item._id}>
                          <div className='my-2'>
                            <div className='my-4 flex items-center p-2 hover:bg-neutral-100'>
                              <div className='mr-3 flex-shrink-0'>
                                <img
                                  className='h-[42px] w-[42px] object-cover'
                                  src={item.product.image}
                                  alt={item.product.name}
                                />
                              </div>
                              <div className='flex-grow-1 overflow-hidden'>
                                <div className='truncate'>{item.product.name}</div>
                              </div>
                              <div className='flex-shirk-0 ml-4'>
                                <div className='text-primary'>{formatCurrency(item.price)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className='flex flex-col items-center justify-center py-10 px-10'>
                      <img src='src/assets/Image/no-product.png' alt='1' className=' block h-[200px] w-[200px] p-4' />
                      <span className='text-sm capitalize text-gray-400'>chưa có sản phẩm</span>
                    </div>
                  )}

                  {/* footer */}
                  {PurchasesList && PurchasesList?.data.data.length > 0 ? (
                    <div className='flex items-center justify-between'>
                      <div className='capitalize text-gray-400'>
                        {PurchasesList && PurchasesList.data.data.length > maxPurchases
                          ? `${PurchasesList.data.data.length - maxPurchases}`
                          : ''}{' '}
                        Thêm vào giỏ hàng
                      </div>
                      <div className='rounded-sm bg-primary hover:opacity-90'>
                        <Link to={path.cart}>
                          <button className='py-2 px-4 capitalize text-white'>Xem giỏ hàng</button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              }
            >
              <Link to={path.cart} className='relative'>
                {PurchasesList && PurchasesList.data.data.length > 0 && (
                  <span className='absolute top-[-2px] right-[-10px] rounded-full bg-white px-[6px] py-[1px] text-xs text-primary'>
                    {PurchasesList.data.data.length}
                  </span>
                )}
                <CartIcon className='h-9 w-9 flex-shrink-0 cursor-pointer hover:text-gray-300' />
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
