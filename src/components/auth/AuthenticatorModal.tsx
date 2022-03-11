import { useEffect } from 'react'
import Authenticator from '~/components/auth/Authenticator'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

function AuthenticatorWrapper () {
  const navigation = useNavigation()
  const user = useSelector((state: RootState) => state.user)
  // ログインしたらモーダルを閉じる
  useEffect(() => {
    if (user.id) {
      navigation.goBack()
    }
  }, [user])
  return (
    <Authenticator />
  )
}

import { FC } from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
const SCREEN_NAME_AUTHENTICATOR = 'Authenticator'

/* モーダルを使用するためのプロバイダ */
const Stack = createStackNavigator()
const AuthenticatorModalProvider: FC = ({ children }) => {
  const _children = () => <>{children}</>
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Group>
        <Stack.Screen
          name="App"
          component={_children}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name={SCREEN_NAME_AUTHENTICATOR}
          component={AuthenticatorWrapper}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
export default AuthenticatorModalProvider

/* モーダルを表示する関数をhooksで提供 */
type ParamList = {
  [SCREEN_NAME_AUTHENTICATOR]: undefined
}
export function useAuthenticatorModal () {
  const navigation = useNavigation<StackNavigationProp<ParamList>>()
  const openAuthenticatorModal = () => navigation.navigate(SCREEN_NAME_AUTHENTICATOR)
  return openAuthenticatorModal
}