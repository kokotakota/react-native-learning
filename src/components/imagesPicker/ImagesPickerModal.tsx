import { useState, useEffect, memo, useCallback } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { HStack, Button } from 'native-base'
import { SafeAreaView, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AlbumSelector from '~/components/imagesPicker/AlbumSelector'
import ImagesPickerFlatList, { FlatListProps } from '~/components/imagesPicker/ImagesPickerFlatList'

/* 画像リストをメモ化 */
const MemoImagesFlatList = memo<FlatListProps>(({ images, onEndReached, pickImage }) => {
  return (
    <ImagesPickerFlatList
      images={images}
      onEndReached={onEndReached}
      pickImage={pickImage}
    />
  )
})

/* イメージピッカー */
const SCREEN_NAME_IMAGES_PICKER = 'ImagesPicker'
type onPicked = (images: MediaLibrary.Asset[]) => {}
type ParamList = {
  [SCREEN_NAME_IMAGES_PICKER]: { onPicked: onPicked }
}
type Props = StackScreenProps<
  ParamList,
  SCREEN_NAME_IMAGES_PICKER
>
function ImagesPicker ({ route }: Props) {
  const navigation = useNavigation()
  const [selectedAlbum, setSelectedAlbum] = useState<string>()
  const [pickedImages, setPickedImages] = useState<number[]>([])
  const [images, setImages] = useState<MediaLibrary.Asset[]>([])
  const [pageInfo, setPageInfo] = useState<{ hasNextPage: boolean, endCursor: string }>()

  // アルバムを変更したとき
  useEffect(() => {
    getFirstImages()
    setPickedImages([])
  }, [selectedAlbum])

  const getFirstImages = async () => {
    await getPermissionStatus()
    await getImages()
  }

  const getImages = async (endCursor: string | undefined = undefined) => {
    const params: MediaLibrary.AssetsOptions = {
      mediaType: ['photo'],
      sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      first: 1000,
      after: endCursor
    }
    if (selectedAlbum) params.album = selectedAlbum
    const photos = await MediaLibrary.getAssetsAsync(params)

    const _images = endCursor
      ? [...images, ...photos.assets]
      : photos.assets
    setImages(_images)
    setPageInfo({ hasNextPage: photos.hasNextPage, endCursor: photos.endCursor })
  }

  // 端末内画像へのアクセス許可
  const getPermissionStatus = async (): Promise<void> => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    status !== 'granted' &&
      alert('カメラロールへのアクセスを許可してください')
  }

  const save = () => {
    route.params.onPicked(pickedImages.map(index => images[index]))
    closeModal()
  }

  const closeModal = () => {
    navigation.goBack()
  }

  const pickImage = useCallback(
    (index: number) => {
      setPickedImages((prev) => {
        const exists = prev.includes(index)
        let result
        if (exists) {
          const removed = prev.filter(elm => elm != index)
          result = removed
        } else {
          result = [...prev, index]
        }
        return result
      })
    },
    []
  )

  const getNextImages = useCallback(
    async () => {
      if (!pageInfo || !pageInfo.hasNextPage) return
      getImages(pageInfo.endCursor)
    },
    [pageInfo]
  )

  return (
    <SafeAreaView>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        pt="4"
        pb="3"
      >
        <Button  variant="ghost" onPress={closeModal}>キャンセル</Button>
        <AlbumSelector
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
        <Button variant="ghost" onPress={save}>保存する</Button>
      </HStack>
      <MemoImagesFlatList
        images={images}
        onEndReached={getNextImages}
        pickImage={pickImage}
      />
    </SafeAreaView>
  )
}

import { FC } from 'react'
import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

/* モーダルを使用するためのプロバイダ */
const Stack = createStackNavigator()
const ImagesPickerModalProvider: FC = ({ children }) => {
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
          name={SCREEN_NAME_IMAGES_PICKER}
          component={ImagesPicker}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
export default ImagesPickerModalProvider

/* モーダルを表示する関数をhooksで提供 */
export function useImagesPickerModal (onPicked: onPicked) {
  const navigation = useNavigation<StackNavigationProp<ParamList>>()
  const openImagesPickerModal = () => navigation.navigate(SCREEN_NAME_IMAGES_PICKER, { onPicked })
  return openImagesPickerModal
}