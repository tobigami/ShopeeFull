import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from './Constants/path'
import { AppContext } from './Contexts/app.contexts'
import MainLayout from './Layouts/MainLayout'
import RegisterLayout from './Layouts/RegisterLayout'
import NotFound from './Pages/404NotFound'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import ProductDetail from './Pages/ProductDetail'
import ProductList from './Pages/ProductList'
import Register from './Pages/Register'
import UserLayout from './Pages/User/Layouts'
import ChangePassword from './Pages/User/Pages/ChangePassword'
import History from './Pages/User/Pages/History'
import Profile from './Pages/User/Pages/Profile'

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
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
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
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      /**
       * if isAuthenticated = true can access Profile page
       * else isAuthenticated = false try access Profile will return login page
       */
      path: path.home,
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <History />
            }
          ]
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
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
