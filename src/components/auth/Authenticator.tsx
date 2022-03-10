import { createStackNavigator } from '@react-navigation/stack'
export type AuthRootParams = {
  SignIn: undefined,
  SignUp: undefined,
  ConfirmSignUp: {
    email: string
    password: string
  }
}
const Stack = createStackNavigator<AuthRootParams>()

import SignIn from '~/components/auth/SignIn'
import SignUp from '~/components/auth/SignUp'
import ConfirmEmail from '~/components/auth/ConfirmEmail'

export default function Account() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='SignIn'
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'ログイン' }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: '会員登録' }}
      />
      <Stack.Screen
        name="ConfirmSignUp"
        component={ConfirmEmail}
        options={{ title: 'メールアドレス認証' }}
      />
    </Stack.Navigator>
  )
}