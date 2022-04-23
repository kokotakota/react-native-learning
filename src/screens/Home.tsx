import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Center, Button, VStack, Box } from 'native-base'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'
import ShareButton from '~/components/ShareButton'
import NotificationButton from '~/components/NotificationButton'
import { useImagesPickerModal, PickedImages } from '~/components/imagesPicker/ImagesPickerModal'
import { useAuthenticatorModal } from '~/components/auth/AuthenticatorModal'

export default function Home () {
  const user = useSelector((state: RootState) => state.user)
  const openAuthenticatorModal = useAuthenticatorModal()
  const [pickedImages, setPickedImages] = useState<PickedImages>([])
  const openImagesPickerModal = useImagesPickerModal(setPickedImages)

  useEffect(() => {
    console.log(pickedImages)
  }, [pickedImages])

  return (
    <Center flex={1} px="3">
      <VStack width="90%" mx="4">
        <Text style={{ alignSelf: 'center' }}>ホーム</Text>
        {!user.id && (
          <Button
            mt="8"
            onPress={openAuthenticatorModal}
          >
            ログイン
          </Button>
        )}
        <Box mt="8">
          <ShareButton />
        </Box>
        <Button
          mt="8"
          onPress={openImagesPickerModal}
        >
          画像選択
        </Button>
        <Box mt="8">
          <NotificationButton />
        </Box>
      </VStack>
    </Center>
  )
}