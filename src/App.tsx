import registerRootComponent from 'expo/build/launch/registerRootComponent'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

import Home from '~/screens/Home'
import Search from '~/screens/Search'
import Account from '~/screens/Account'

const tabs = [
  {
    elm: Home,
    name: 'Home',
    label: 'ホーム',
    icon: (<></>)
  },
  {
    elm: Search,
    name: 'Search',
    label: '検索',
    icon: (<></>)
  },
  {
    elm: Account,
    name: 'Account',
    label: 'アカウント',
    icon: (<></>)
  },
]

export default function App () {
  return (
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
  )
}

registerRootComponent(App)