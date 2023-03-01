import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  console.log({ routeElements })
  return <div className='App'>{routeElements}</div>
}

export default App
