import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/Constants/path'
import { StarNoColor, StarYellow } from 'src/Icons/Icon'
import { QueryConfig } from 'src/Types/products.type'

/**
 * index = 0 thì indexStar 0 - 4 có màu vàng
 * index = 1 thì indexStar 0 - 3 có màu vàng
 * index = 2 thì indexStar 0 - 2 có màu vàng
 * index = 3 thì indexStar 0 - 1 có màu vàng
 * index = 4 thì indexStar 0 - 0 có màu vàng
 * điều kiện để có ngồi sao màu vào là những indexStart < 5 - index
 * @returns
 */

interface Props {
  queryConfig: QueryConfig
}

function StarSort({ queryConfig }: Props) {
  const navigate = useNavigate()

  const handleStarSort = (index: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, rating_filter: String(index) }).toString()
    })
  }
  return (
    <div className='hidden sm:block'>
      <ul>
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handleStarSort(5 - index)
                }}
                aria-hidden='true'
              >
                <li className='cursor-pointer'>
                  <div className='flex items-center'>
                    {Array(5)
                      .fill(0)
                      .map((_, indexStar) => {
                        if (indexStar < 5 - index) {
                          return (
                            <div className='mx-[2px]' key={indexStar}>
                              <StarYellow />
                            </div>
                          )
                        } else
                          return (
                            <div className='mx-[2px]' key={indexStar}>
                              <StarNoColor />
                            </div>
                          )
                      })}

                    {index !== 0 && <span className='ml-5 text-sm'>Trở lên</span>}
                  </div>
                </li>
              </div>
            )
          })}
      </ul>
    </div>
  )
}

export default StarSort
