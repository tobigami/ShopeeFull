import { useSearchParams } from 'react-router-dom'

export const GetQueryParams = () => {
  const [params] = useSearchParams()
  const paramsObj = Object.fromEntries([...params])
  return paramsObj
}
