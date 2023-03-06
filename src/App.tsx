import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()
  return (
    <div className='App'>
      {routeElements}
      <ToastContainer
        position='top-right'
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='light'
      />
    </div>
  )
}

export default App
