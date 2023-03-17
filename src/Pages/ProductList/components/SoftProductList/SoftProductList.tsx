import classNames from 'classnames'
import omit from 'lodash/omit'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { path, sortBy, order as orderConst } from 'src/Constants/path'
import { ProductListConfig, QueryConfig } from 'src/Types/products.type'

interface Props {
  pageSize: number
  queryConfig: QueryConfig
}

function SoftProductList({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.view, order } = queryConfig
  const navigate = useNavigate()
  // variable active
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sortByValue === sort_by
  }
  // handle sort
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return navigate({
      pathname: path.home,
      search: createSearchParams(omit({ ...queryConfig, sort_by: sortByValue }, ['order'])).toString()
    })
  }

  // handle order price
  const handleOrderPrice = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    return navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, sort_by: sortBy.price, order: orderValue }).toString()
    })
  }
  return (
    <div className='bg-[#ededed]'>
      <div className='flex flex-wrap items-center justify-between p-5'>
        <div className='flex items-center justify-center gap-2'>
          <div className='text-sm text-gray-500'>Sắp sếp theo</div>
          <button
            onClick={() => handleSort(sortBy.view)}
            className={classNames('rounded-sm  px-5 py-2 text-sm  shadow-sm', {
              'bg-primary text-white hover:bg-primary/90': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-200': !isActiveSortBy(sortBy.view)
            })}
          >
            Phổ biến
          </button>
          <button
            onClick={() => handleSort(sortBy.createdAt)}
            className={classNames('rounded-sm  px-5 py-2 text-sm  shadow-sm', {
              'bg-primary text-white hover:bg-primary/90': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-200': !isActiveSortBy(sortBy.createdAt)
            })}
          >
            Mới nhất
          </button>

          <button
            onClick={() => handleSort(sortBy.sold)}
            className={classNames('rounded-sm  px-5 py-2 text-sm  shadow-sm', {
              'bg-primary text-white hover:bg-primary/90': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-200': !isActiveSortBy(sortBy.sold)
            })}
          >
            Bán chạy
          </button>
          {/* select */}
          <select
            onChange={(e) => {
              handleOrderPrice(e.target.value as Exclude<ProductListConfig['order'], undefined>)
            }}
            className={classNames('px-4 py-2 text-left text-sm capitalize outline-none ', {
              'bg-white text-black hover:bg-slate-300': !isActiveSortBy(sortBy.price),
              'bg-primary text-white hover:bg-primary/70': isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
          >
            <option disabled value='' className='bg-white text-black'>
              Giá
            </option>
            <option className='bg-white text-black' value={orderConst.asc}>
              Giá: thấp đến cao
            </option>
            <option className='bg-white text-black' value={orderConst.desc}>
              Giá: cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div className='px-4'>
            <span className='text-primary'>{page}</span>
            <span className='px-1'>/</span>
            <span>{pageSize}</span>
          </div>

          {page === 1 ? (
            <span
              className={classNames(
                'mx-1 cursor-not-allowed rounded-sm border bg-white px-2 py-2  shadow-sm outline-none hover:bg-slate-200'
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </span>
          ) : (
            <Link
              title='prePage'
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className={classNames('mx-1 rounded-sm border bg-white px-2 py-2 shadow-sm  outline-none', {
                'cursor-pointer hover:bg-slate-200': page > 1
              })}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Link>
          )}

          {page === pageSize ? (
            <span
              className={classNames(
                'mx-1 cursor-not-allowed rounded-sm border bg-white px-2 py-2  shadow-sm outline-none hover:bg-slate-200'
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </span>
          ) : (
            <Link
              title='nextPage'
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className={classNames('mx-1 rounded-sm border bg-white px-2 py-2 shadow-sm  outline-none', {
                'cursor-pointer hover:bg-slate-200': page > 1
              })}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          )}

          {/* <div className='flex items-center'>
            <button className='flex items-center rounded-sm bg-white px-2 py-2 text-center outline-none hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SoftProductList
