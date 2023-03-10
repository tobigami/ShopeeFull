import { omitBy, isUndefined } from 'lodash'
import { QueryConfig } from 'src/Types/products.type'
import { GetQueryParams } from './GetQueryParams'

export const UseQueryConfig = () => {
  const params: QueryConfig = GetQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: params.page || '1',
      limit: params.limit || '5',
      order: params.order,
      sort_by: params.sort_by,
      category: params.category,
      exclude: params.exclude,
      rating_filter: params.rating_filter,
      price_max: params.price_max,
      price_min: params.price_min,
      name: params.name
    },
    isUndefined
  )
  return queryConfig
}
