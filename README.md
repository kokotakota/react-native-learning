## 環境構築
- Xcodeインストール
- Android Studioインストール
  - AVD Managerでシミュレータが起動できるようにしておく
- Expo CLI
  - ```yarn global add expo-cli```
- プロジェクト作成
  - ```expo init <プロジェクト名>```

## デバッグ
### Android
シミュレータを起動した状態で実行  
```yarn android```

### iOS
```yarn ios```

#### 「```Unable to verify Xcode and Simulator installation.```」と表示される場合
- シミュレータのインストール
  - Xcode > preferences... > ComponentsタブiOSのシミュレータをインストールする
- Command Line Toolsの設定
  - Xcode > preferences... > Locationsタブで、Command Line Tools: に「Xcode x.x.x」と選択されている状態にする

## ビルド
### Expo CLIを使用する場合
- Expoのアカウントが必要
- コマンドを実行しアカウント情報を入力するとビルドが開始される。ビルドが完了すると、Expoのアカウント画面でダウンロードできる。

#### iOSの場合
```expo build:ios```

#### Androidの場合
```expo build:android```

Androidビルド時の質問
```
? Choose the build type you would like:
apk（app bundleではシュミレータで実行できなかったため）
```

#### Amplifyを使用している場合に起こるビルド時のエラー
```
Failed to construct transformer: DuplicateError: Duplicated files or mocks. ...
```
Amplifyによって自動生成される#current-cloud-backendフォルダが原因。
以下どちらかの対応で解消可能。
- ビルドするときだけ#current-cloud-backendフォルダを一時的に退避しビルド後に戻す。
- プロジェクトルートにmetro.config.jsを作成し、以下を記述する。
```
const { getDefaultConfig } = require('@expo/metro-config')
const defaultConfig = getDefaultConfig(__dirname)

const exclusionList = require('metro-config/src/defaults/exclusionList')
defaultConfig.resolver.blacklistRE = exclusionList([
/#current-cloud-backend/.*/
])

module.exports = defaultConfig
```

## srcディレクトリ設定
- srcディレクトリを作成しApp.tsxを移動
- package.jsonのmainを"src/App.tsx"に書き換え
- srcをルートとしたインポートを可能にする
  - babel-plugin-root-importを追加
    - ```yarn add --dev babel-plugin-root-import```
  - babel.config.jsに以下を記述
```
plugins: [
  [
    'babel-plugin-root-import',
    {
      rootPathPrefix: '~',
      rootPathSuffix: 'src',
    }
  ]
]
```
  - tsconfig.jsonに以下を記述
```
"compilerOptions": {
  "baseUrl": "./src",
  "paths": {
    "~/*": ["*"]
  }
}
```
  - src/App.tsxに以下を記述
```
import registerRootComponent from 'expo/build/launch/registerRootComponent'
・・・
// エントリポイントとなるコンポーネントを渡す
registerRootComponent(App)
```

## ナビゲーション
React Navigation
```
yarn add react-navigation @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
```
依存関係のあるライブラリをexpoでインストールする
```
expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
```

## UIフレームワーク
Native Base
```
yarn add native-base
```
依存関係のあるライブラリをexpoでインストールする
```
expo install react-native-svg react-native-safe-area-context
```

アプリ全体でThemeを参照するために、App.tsxにNativeBaseProviderを置く

## 状態管理、永続化
Redux Toolkit、Persist
```
yarn add @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage
```

アプリ全体でstoreを参照するために、App.tsxにReduxのProviderを置く