import { useState, useCallback } from 'react'
import * as MediaLibrary from 'expo-media-library'

import { Pressable, Icon } from 'native-base'
import { Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { useTheme } from "native-base"

export interface ThumbnailProps {
  image: MediaLibrary.Asset
  index: number
  pickImage: (index: number) => void
}
export default function ImagesPickerThumbnail ({ image, index, pickImage }: ThumbnailProps) {
  const [picked, setPicked] = useState<boolean>(false)
  const { colors } = useTheme()

  const pick = useCallback(() => {
    setPicked((prev) => !prev)
    pickImage(index)
  }, [])

  return (
    <Pressable
      onPress={pick}
      borderWidth="1"
      borderColor="white"
      width="33.3%"
      height="100"
    >
      <Image
        source={{
          uri: image.uri
        }}
        style={{
          width: '100%',
          height: 98,
          resizeMode: "contain",
          borderWidth: picked ? 2 : 0,
          borderColor: colors.primary['500']
        }}
      />
      {picked && (
        <Icon
          as={AntDesign}
          name="checkcircle"
          size="sm"
          color="primary.500"
          style={{
            position: "absolute", 
            top: 5, 
            right: 5
          }}
        />
      )}
    </Pressable>
  )
}