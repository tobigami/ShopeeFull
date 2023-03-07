import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import { path } from 'src/Constants/path'
import { QueryConfig } from 'src/Types/products.type'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2

function Pagination({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let isDotAfter = false
    let isDotBefore = false
    const renderDotBefore = (index: number) => {
      if (!isDotBefore) {
        isDotBefore = true
        return (
          <button
            disabled
            key={index}
            className='mx-2 max-h-[27px] rounded-sm border bg-white px-2  py-1  shadow-sm outline-none'
          >
            ...
          </button>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!isDotAfter) {
        isDotAfter = true
        return (
          <button
            disabled
            key={index}
            className='mx-2 max-h-[27px] rounded-sm border bg-white px-2 py-1  shadow-sm  outline-none'
          >
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (page <= RANGE * 2 + 1 && pageNumber < pageSize - RANGE + 1 && pageNumber > page + RANGE) {
          return renderDotAfter(index)
        } else if (page > 2 * RANGE + 1 && page < pageSize - 2 * RANGE) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - 2 * RANGE && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'mx-1 min-w-[36px] cursor-pointer rounded-sm border bg-white px-2 py-1 shadow-sm outline-none hover:bg-slate-200',
              {
                'border-cyan-400': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div>
      {page === 1 ? (
        <span
          className={classNames(
            'mx-1 cursor-not-allowed rounded-sm border bg-white px-2 py-1  shadow-sm outline-none hover:bg-slate-200'
          )}
        >
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className={classNames('mx-1 rounded-sm border bg-white px-2 py-1 shadow-sm  outline-none', {
            'cursor-pointer hover:bg-slate-200': page > 1
          })}
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {/* next */}
      {page === pageSize ? (
        <span
          className={classNames(
            'mx-1 cursor-not-allowed rounded-sm border bg-white px-2 py-1  shadow-sm outline-none hover:bg-slate-200'
          )}
        >
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className={classNames('mx-1 rounded-sm border bg-white px-2 py-1 shadow-sm  outline-none', {
            'cursor-pointer hover:bg-slate-200': page > 1
          })}
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination
