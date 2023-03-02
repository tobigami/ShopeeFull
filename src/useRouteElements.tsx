import { useRoutes } from 'react-router-dom'
import RegisterLayout from './Layouts/RegisterLayout'
import Login from './Pages/Login'
import ProductList from './Pages/ProductList'
import Register from './Pages/Register'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
