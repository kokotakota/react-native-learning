import { useEffect } from 'react';
import Authenticator from '~/components/auth/Authenticator'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'

import { NavigationParams, NavigationScreenProp, NavigationState,} from 'react-navigation'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function Account ({ navigation }: Props) {
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