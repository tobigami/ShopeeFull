import { createContext, useState } from 'react'
import { User } from 'src/Types/user.type'
import { getAccessToken, getProfile } from 'src/utils/localStorage'

interface AppContextInterface {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialState: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setAuthenticated: () => null,
  profile: getProfile(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialState)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(initialState.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialState.profile)
  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}

// export default AppProvider
