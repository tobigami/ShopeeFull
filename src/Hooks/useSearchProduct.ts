import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/Constants/path'
import { searchSchema, searchSchemaType } from 'src/utils/rules'
import { UseQueryConfig } from './useQueryConfig'

type SearchInput = searchSchemaType

export default function useSearchProduct() {
  const queryConfig = UseQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SearchInput>({
    resolver: yupResolver(searchSchema)
  })

  const handleOnSubmit = handleSubmit((data) => {
    if (data) {
      const config = queryConfig.order
        ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by'])
        : { ...queryConfig, name: data.name }

      navigate({
        pathname: path.home,
        search: createSearchParams({ ...config }).toString()
      })
    }
  })
  return { register, handleOnSubmit }
}
