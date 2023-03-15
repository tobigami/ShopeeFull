import { createContext, useState } from 'react'
import { ExtendPurchasesType } from 'src/Types/purchases.type'
import { User } from 'src/Types/user.type'
import { getAccessToken, getProfile } from 'src/utils/localStorage'

interface AppContextInterface {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  ExtendPurchases: ExtendPurchasesType[]
  setExtendPurchases: React.Dispatch<React.SetStateAction<ExtendPurchasesType[]>>
  reset: () => void
}

const initialState: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setAuthenticated: () => null,
  profile: getProfile(),
  setProfile: () => null,
  ExtendPurchases: [],
  setExtendPurchases: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initialState)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [ExtendPurchases, setExtendPurchases] = useState<ExtendPurchasesType[]>(initialState.ExtendPurchases)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(initialState.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialState.profile)

  const reset = () => {
    setExtendPurchases([]), setAuthenticated(false), setProfile(null)
  }
  return (
    <AppContext.Provider
      value={{ isAuthenticated, setAuthenticated, profile, setProfile, ExtendPurchases, setExtendPurchases, reset }}
    >
      {children}
    </AppContext.Provider>
  )
}

// export default AppProvider
