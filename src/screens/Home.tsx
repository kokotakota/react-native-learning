import { useState } from 'react'
import { Text, Modal } from 'react-native'
import { Center, Button } from 'native-base'
import Authenticator from '~/components/auth/Authenticator'

import { NavigationParams, NavigationScreenProp, NavigationState,} from 'react-navigation'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function Home ({ navigation }: Props) {
  const [ modal, setModal ] = useState<boolean>(false)
  return (
    <Center flex={1} px="3">
      <Text>ホーム</Text>
      <Button
        mt="8"
        onPress={() => navigation.navigate('Authenticator')}
      >
        ログイン
      </Button>
    </Center>
  )
}