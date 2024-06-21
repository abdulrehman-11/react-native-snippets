import { NavigationContainer } from '@react-navigation/native'
import { FC, useState } from 'react'
import FlashMessage from 'react-native-flash-message'
import 'react-native-gesture-handler'

import { ApolloProvider } from '@apollo/client'
import { Platform } from 'react-native'
import { ActivityIndicator } from './src/components'
import UserLoggedRenderer from './src/components/UserLoggedRenderer'
import { client } from './src/config/Graphql-client'
import {
  AuthContext,
  LanguageContext,
  LoaderContext,
  ShopContext,
} from './src/context'
import { AuthNavigation, DrawerNavigation } from './src/navigation'
import type { Shop, User } from './src/types'

const App: FC = () => {
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [language, setLanguage] = useState('en-US')
  const [shop, setShop] = useState<Shop | null>(null)

  // @ts-ignore
  return (
    <ApolloProvider client={client}>
      <LanguageContext.Provider value={{ setLanguage, language }}>
        <LoaderContext.Provider value={{ loading, setLoading }}>
          <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            <ShopContext.Provider value={{ setShop, shop }}>
              <NavigationContainer>
                {token === '' ? <AuthNavigation /> : <DrawerNavigation />}
                <FlashMessage
                  position={Platform.OS === 'android' ? 'center' : 'top'}
                  style={
                    Platform.OS === 'android' ? { marginBottom: '165%' } : {}
                  }
                />
                <ActivityIndicator visible={loading} />
                <UserLoggedRenderer />
              </NavigationContainer>
            </ShopContext.Provider>
          </AuthContext.Provider>
        </LoaderContext.Provider>
      </LanguageContext.Provider>
    </ApolloProvider>
  )
}

export default App