import { createContext, useState } from 'react'
import { getAccessToken } from 'src/utils/localStorage'

interface AppContextInterface {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initialState)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(initialState.isAuthenticated)
  return <AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>{children}</AppContext.Provider>
}

// export default AppProvider
