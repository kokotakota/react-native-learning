import { Text } from 'react-native'
import { Center, Button, VStack } from 'native-base'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'
import ShareButton from '~/components/ShareButton'

import { NavigationParams, NavigationScreenProp, NavigationState,} from 'react-navigation'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default function Home ({ navigation }: Props) {
  const user = useSelector((state: RootState) => state.user)
  return (
    <Center flex={1} px="3">
      <VStack width="90%" mx="4">
        <Text style={{ alignSelf: 'center' }}>ホーム</Text>
        {!user.id && (
          <Button
            mt="8"
            onPress={() => navigation.navigate('Authenticator')}
          >
            ログイン
          </Button>
        )}
        <ShareButton />
      </VStack>
    </Center>
  )
}