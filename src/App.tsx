import registerRootComponent from 'expo/build/launch/registerRootComponent'

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
import Authenticator from '~/components/auth/Authenticator'

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


function BottomNavigation () {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={tabs[0].name}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          name={tab.name}
          component={tab.elm}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: () => tab.icon
          }}
        />
      ))}
    </Tab.Navigator>
  )
}
export default function App () {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          <Stack.Group>
            <Stack.Screen
            
              name="App"
              component={BottomNavigation}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="Authenticator"
              component={Authenticator}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

registerRootComponent(App)