import { Platform, Share } from 'react-native'
import { Button, Icon } from 'native-base'
import { EvilIcons } from '@expo/vector-icons'

export default function ShareButton () {
  const share = async () => {
    // iosの場合、messageの代わりにurlに入れるとwebサイトとして認識される
    const content = Platform.OS === "ios"
      // iOS
      ? {
          url: 'https://github.com/kokotakota'
        }
      // Android
      : {
          title: 'タイトル',
          message: 'https://github.com/kokotakota'
        }
    const result = await Share.share(content)
    if(result.action == Share.dismissedAction) {
      // シェアを中断した場合の処理(iOSのみ)
    } else if(result.action == Share.sharedAction) {
      // シェアを実行した場合(Androidの場合は常にここの処理が実行される)
    } else {}
  }
  
  return (
    <>
      <Button onPress={share}>
        <Icon as={EvilIcons} name="share-apple" size="sm" color="white" />
      </Button>
    </>
  )
}