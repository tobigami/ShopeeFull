import { CategoryType } from 'src/Types/category.type'
import { SuccessResponseApi } from 'src/Types/utils.type'
import http from 'src/utils/http'

const URL = '/categories'

export const getCategories = () => {
  return http.get<SuccessResponseApi<CategoryType[]>>(URL)
}
