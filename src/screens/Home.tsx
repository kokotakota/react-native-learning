import { Text } from 'react-native'
import { Center, Button } from 'native-base'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'

import { NavigationParams, NavigationScreenProp, NavigationState,} from 'react-navigation'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function Home ({ navigation }: Props) {
  const user = useSelector((state: RootState) => state.user)
  return (
    <Center flex={1} px="3">
      <Text>ホーム</Text>
      {!user.id && (
        <Button
          mt="8"
          onPress={() => navigation.navigate('Authenticator')}
        >
          ログイン
        </Button>
      )}
    </Center>
  )
}