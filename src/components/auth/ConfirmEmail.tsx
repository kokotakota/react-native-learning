import { useState } from 'react'
import { Center, Heading, VStack, FormControl, Input, Button } from 'native-base'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { AuthRootParams } from '~/components/auth/Authenticator'
import { StackActions } from '@react-navigation/native'

import { useDispatch } from 'react-redux'
import { userSlice } from '~/store/user'

import { StackScreenProps } from '@react-navigation/stack'
type Props = StackScreenProps<
  AuthRootParams,
  'ConfirmSignUp'
>

interface Inputs {
  code: string
}

export default function ConfirmEmail({ navigation, route }: Props) {
  const [ loading, setLoading ] = useState<boolean>(false)
  const { control, handleSubmit, formState: { errors }, clearErrors, setError } = useForm<Inputs>()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      // メールアドレス認証処理
      const { email, password } = route.params
      await new Promise(resolve => setTimeout(resolve, 500))
      const user = { id: email, name: 'テスト' }
      dispatch(userSlice.actions.setUser(user))
      navigation.dispatch(StackActions.popToTop())
    } catch (e: any) {
      // コードが間違っている場合
      if (e.code === 'CodeMismatchException') {
        setError('code', { type: "manual", message: '認証コードが正しくありません' })
      } else {
        throw e
      }
    } finally {
      setLoading(false)
    }
  }

  const resendConfirmCode = async () => {
    setLoading(true)
    // 認証コード再送信処理
    await new Promise(resolve => setTimeout(resolve, 500))
    setLoading(false)
  }

  return (
    <Center flex={1} px="3">
      <VStack width="90%" mx="4">
        <Heading
          size="lg"
          fontWeight="semibold"
          color="coolGray.800"
          mb="6"
        >
          認証コード入力
        </Heading>
        <Controller
          control={control}
          rules={{required: '必須入力です'}}
          name='code'
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              isRequired
              isInvalid={'code' in errors}
              mt="2"
            >
              <FormControl.Label _text={{bold: true}}>認証コード</FormControl.Label>
              <Input
                placeholder=""
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormControl.HelperText _text={{fontSize: 'xs'}}>
                登録したメールアドレス宛てに送信された認証コードを入力してください
              </FormControl.HelperText>
              {errors.code && (
                <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                  {errors.code.message}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        />
        <Button
          mt="8"
          isLoading={loading}
          onPress={handleSubmit(onSubmit)}
        >
          認証
        </Button>
        <Button
          mt="8"
          isLoading={loading}
          onPress={resendConfirmCode}
        >
          再送信
        </Button>
      </VStack>
    </Center>
  )
}