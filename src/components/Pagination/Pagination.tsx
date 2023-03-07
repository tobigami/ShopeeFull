import classNames from 'classnames'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}
const RANGE = 2

function Pagination({ page, pageSize, setPage }: Props) {
  console.log(page)
  const renderPagination = () => {
    let isDotAfter = false
    let isDotBefore = false
    const renderDotBefore = (index: number) => {
      if (!isDotBefore) {
        console.log('...dot before')
        isDotBefore = true
        return (
          <button disabled key={index} className='bg-white px-2 py-1 mx-2 outline-none rounded-sm  shadow-sm  border'>
            ...
          </button>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!isDotAfter) {
        console.log(' dot after')
        isDotAfter = true
        return (
          <button disabled key={index} className='bg-white px-2 py-1 mx-2 outline-none rounded-sm  shadow-sm  border'>
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
          <button
            onClick={() => {
              setPage(pageNumber)
            }}
            key={index}
            className={classNames(
              'bg-white px-2 py-1 mx-1 outline-none rounded-sm cursor-pointer shadow-sm hover:bg-slate-200 border min-w-[36px]',
              {
                'border-cyan-400': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div>
      <div></div>
      <button
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1)
        }}
        className={classNames('bg-white px-2 py-1 mx-1 outline-none rounded-sm shadow-sm  border', {
          'cursor-pointer hover:bg-slate-200': page > 1
        })}
      >
        Prev
      </button>
      {renderPagination()}
      <button
        disabled={page === pageSize}
        onClick={() => {
          setPage(page + 1)
        }}
        className={classNames('bg-white px-2 py-1 mx-1 outline-none rounded-sm shadow-sm  border', {
          'cursor-pointer hover:bg-slate-200': page < pageSize
        })}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
