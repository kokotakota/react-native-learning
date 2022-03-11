import { memo, useCallback } from 'react'
import * as MediaLibrary from 'expo-media-library'

import { FlatList } from 'native-base'
import ImagesPickerThumbnail, { ThumbnailProps } from '~/components/imagesPicker/ImagesPickerThumbnail'

/* サムネイルコンポーネントをメモ化 */
// 画像タップでの親のstate更新時にFlatListのrenderItemが走るため、
// 自前の比較関数を使って無駄なレンダリングをしないよう制御
function arePropsEqual(prevProps: ThumbnailProps, nextProps: ThumbnailProps) {
  return nextProps.image == prevProps.image
}
const MemoImagesPickerThumbnail = memo<ThumbnailProps>(({ image, index, pickImage }) => {
  return (
    <ImagesPickerThumbnail
      image={image}
      index={index}
      pickImage={pickImage}
    />
  )
}, arePropsEqual)

export interface FlatListProps {
  images: MediaLibrary.Asset[]
  onEndReached: () => Promise<void>
  pickImage: (index: number) => void
}
export default function ImagesPickerFlatList ({ images, onEndReached, pickImage }: FlatListProps) {
  const keyExtractor = useCallback(
    (item, index) => item.uri,
    [images]
  )
  const renderItem = useCallback(
    ({ item, index }: { item: any, index: number }) => {
      return <MemoImagesPickerThumbnail image={item} index={index} pickImage={pickImage} />
    },
    [images]
  )

  return (
    <FlatList
      numColumns={3}
      data={images}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  )
}
