import registerRootComponent from 'expo/build/launch/registerRootComponent'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '~/store'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import { NativeBaseProvider, Icon } from 'native-base'
// @expo/vector-iconsはデフォルトで入っているためインストール不要
import { AntDesign } from '@expo/vector-icons'

import Home from '~/screens/Home'
import Search from '~/screens/Search'
import Account from '~/screens/Account'
import AuthenticatorModalProvider from '~/components/auth/AuthenticatorModal'
import ImagesPickerModalProvider from '~/components/imagesPicker/ImagesPickerModal'

const tabs = [
  {
    elm: Home,
    name: 'Home',
    label: 'ホーム',
    icon: (<Icon as={AntDesign} name="home" size="sm" />)
  },
  {
    elm: Search,
    name: 'Search',
    label: '検索',
    icon: (<Icon as={AntDesign} name="search1" size="sm" />)
  },
  {
    elm: Account,
    name: 'Account',
    label: 'アカウント',
    icon: (<Icon as={AntDesign} name="user" size="sm" />)
  },
]

function App () {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <ImagesPickerModalProvider>
          <AuthenticatorModalProvider>
            <Tab.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={tabs[0].name}
            >
              {tabs.map((tab) => (
                <Tab.Screen
                  key={tab.name}
                  name={tab.name}
                  component={tab.elm}
                  options={{
                    tabBarLabel: tab.label,
                    tabBarIcon: () => tab.icon
                  }}
                />
              ))}
            </Tab.Navigator>
          </AuthenticatorModalProvider>
        </ImagesPickerModalProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

function AppWrapper (context: any) {
  return (
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <App {...context} />
      </PersistGate>
    </Provider>
  )
}

registerRootComponent(AppWrapper)
export default AppWrapper