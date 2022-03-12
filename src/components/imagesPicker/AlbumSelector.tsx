import { useState, useEffect } from 'react'
import * as MediaLibrary from 'expo-media-library'

import { Select, CheckIcon } from 'native-base'
interface AlbumSelectorProps {
  selectedAlbum: string
  setSelectedAlbum: (value: string, ) => void
}

export default function AlbumSelector ({ selectedAlbum, setSelectedAlbum }: AlbumSelectorProps) {
  const [selectItems, setSelectItems] = useState<{ id: string, title: string }[]>([])

  useEffect(() => {
    getAlbums()
  }, [])

  const getAlbums = async () => {
    const granted = await isGrantedMediaLibrary()
    if (!granted) {
      alert('カメラロールへのアクセスを許可してください')
      return
    }
    const albums = await MediaLibrary.getAlbumsAsync()
    const items = [
      { id: '', title: 'すべての画像' },
      ...albums.map(elm => ({ id: elm.id, title: elm.title }))
    ]
    setSelectItems(items)
    setSelectedAlbum('')
  }

  // 端末内画像へのアクセス許可
  const isGrantedMediaLibrary = async (): Promise<boolean> => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    return status === 'granted'
  }

  return (
    <Select
      selectedValue={selectedAlbum}
      minWidth="100"
      _selectedItem={{
        endIcon: <CheckIcon size="3" />
      }}
      fontSize='14'
      // variant="filled"
      variant="unstyled"
      placeholder="アルバムを選択"
      onValueChange={value => setSelectedAlbum(value)}
    >
      {selectItems.map(item => (
        <Select.Item key={item.id} label={item.title} value={item.id} />
      ))}
    </Select>
  )
}