import { useSearchParams } from 'react-router-dom'

export const getQueryParams = () => {
  const [params] = useSearchParams()
  const paramsObj = Object.fromEntries([...params])
  return paramsObj
}
