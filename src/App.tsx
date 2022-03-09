import registerRootComponent from 'expo/build/launch/registerRootComponent'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

import { NativeBaseProvider, Icon } from 'native-base'
// @expo/vector-iconsはデフォルトで入っているためインストール不要
import { AntDesign } from '@expo/vector-icons'

import Home from '~/screens/Home'
import Search from '~/screens/Search'
import Account from '~/screens/Account'

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

export default function App () {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
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
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

registerRootComponent(App)