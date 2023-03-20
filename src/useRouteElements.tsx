import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from './Constants/path'
import { AppContext } from './Contexts/app.contexts'
import MainLayout from './Layouts/MainLayout'
import RegisterLayout from './Layouts/RegisterLayout'
// import NotFound from './Pages/404NotFound'
import Cart from './Pages/Cart'
import UserLayout from './Pages/User/Layouts'
// import NotFound from './Pages/404NotFound'
// import Login from './Pages/Login'
// import ProductDetail from './Pages/ProductDetail'
// import ProductList from './Pages/ProductList'
// import Register from './Pages/Register'
// import ChangePassword from './Pages/User/Pages/ChangePassword'
// import History from './Pages/User/Pages/History'
// import Profile from './Pages/User/Pages/Profile'

const Login = lazy(() => import('./Pages/Login'))
const ProductDetail = lazy(() => import('./Pages/ProductDetail'))
const ProductList = lazy(() => import('./Pages/ProductList'))
const Register = lazy(() => import('./Pages/Register'))
const ChangePassword = lazy(() => import('./Pages/User/Pages/ChangePassword'))
const History = lazy(() => import('./Pages/User/Pages/History'))
const Profile = lazy(() => import('./Pages/User/Pages/Profile'))
const NotFound = lazy(() => import('./Pages/404NotFound'))

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
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
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
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <History />
                </Suspense>
              )
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
