import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { localStorageEventTarget } from './utils/localStorage'
import { AppContext } from './Contexts/app.contexts'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLSEvent', reset)
    return () => {
      localStorageEventTarget.addEventListener('clearLSEvent', reset)
    }
  }, [reset])
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
