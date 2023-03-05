import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './Contexts/app.contexts'
import MainLayout from './Layouts/MainLayout'
import RegisterLayout from './Layouts/RegisterLayout'
import Login from './Pages/Login'
import ProductList from './Pages/ProductList'
import Profile from './Pages/Profile'
import Register from './Pages/Register'

/**
 * Kiểm tra xem người dùng đã đăng nhập hay chưa
 *
 * isAuthenticated = true tiếp tục cho truy cập những trang như profile
 *
 * isAuthenticated = false thì sẽ dẫn về trang login
 *
 * @returns
 */

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
function useRouteElements() {
  const routeElements = useRoutes([
    {
      index: true,
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      /**
       * if isAuthenticated = true can access Profile page
       * else isAuthenticated = false try access Profile will return login page
       */
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    /**
     * if isAuthenticated = false => login and register is able
     * else when isAuthenticated = true can not access login and register page ==> '/'
     */
    {
      path: '/',
      element: <RejectRoute />,
      children: [
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
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
