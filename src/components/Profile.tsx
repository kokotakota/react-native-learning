import { Center, VStack, Text, Button } from 'native-base'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '~/store'
import { userSlice }  from '~/store/user'

export default function Profile() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(userSlice.actions.reset())
  }

  return (
    <>
      <Center flex={1} px="3">
        <VStack width="90%" mx="4">
          <Text alignSelf="center">
            ユーザーID: {user.id}
          </Text>
          <Button mt="8" onPress={signOut}>
            ログアウト
          </Button>
        </VStack>
      </Center>
    </>
  )
}