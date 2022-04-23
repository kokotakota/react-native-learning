import { useEffect, useState, useRef } from 'react'

import {
  setNotificationHandler,
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  getExpoPushTokenAsync,
  removeNotificationSubscription,
  setBadgeCountAsync
} from 'expo-notifications'
import { Text } from 'react-native'
import { Button, Box } from 'native-base'

export default function NotificationButton () {
  const [token, setToken] = useState<string>()
  const notificationListener = useRef<any>()
  const responseListener = useRef<any>()

  useEffect(() => {
    getToken()

    // アプリを開いているときに受信したプッシュ通知のイベントリスナー
    notificationListener.current = addNotificationReceivedListener(e => {
      alert(e.request.content.data.message)
    })
  
    // 通知バーをタップしてアプリを開いたときのイベントリスナー
    responseListener.current = addNotificationResponseReceivedListener(e => {
      setBadgeCountAsync(0) // バッジの値の操作
      alert(e.notification.request.content.data.message)
    })

    setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    })

    // イベントが重複して登録されないようclean up関数でremoveしておく
    return () => {
      removeNotificationSubscription(notificationListener.current)
      removeNotificationSubscription(responseListener.current)
    }
  })

  const getToken = async () => {
    const { data } = await getExpoPushTokenAsync()
    setToken(data)
  }

  // 通知許可設定
  const getPermission = async () => {
    const { granted } = await getPermissionsAsync()
    if (granted) return true

    const { granted: finalGranted } = await requestPermissionsAsync()
    return finalGranted
  }

  const pushNotification = async () => {
    const permission = await getPermission()
    if (!permission) return

    await scheduleNotificationAsync({
      content: {
        title: 'タイトル',
        subtitle: 'サブタイトル',
        body: '本文',
        sound: 'default', // 着信音
        badge: 1, // バッジに表示する数値
        data: {
          message: '通知から取得したデータです'
        }
      },
      trigger: {
        seconds: 3 // n秒後に通知
      }
    })
  }
  
  return (
    <>
      <Button onPress={pushNotification}>
        通知
      </Button>
      {token &&
        <Box mt="2"><Text selectable>{token}</Text></Box>
      }
    </>
  )
}