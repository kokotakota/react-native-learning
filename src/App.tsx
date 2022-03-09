import registerRootComponent from 'expo/build/launch/registerRootComponent'

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import Test from '~/components/Test'

export default function App () {
  return (
    <View style={styles.container}>
      <Test />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

registerRootComponent(App)