import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import Test from '~/components/Test'

export default function Home () {
  return (
    <Stack.Navigator initialRouteName="Test">
      <Stack.Screen name="Test1" component={Test} options={{ title: 'テスト' }}/>
      <Stack.Screen name="Test2" component={Test} options={{ title: 'テスト' }}/>
    </Stack.Navigator>
  )
}