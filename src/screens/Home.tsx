import { Text } from 'react-native'
import { Center, Button } from 'native-base'

import { NavigationParams, NavigationScreenProp, NavigationState,} from 'react-navigation'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function Home ({ navigation }: Props) {
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