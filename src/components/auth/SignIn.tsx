import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Center, Heading, VStack, FormControl, Input, Button, Link } from 'native-base'

import { NavigationParams, NavigationScreenProp, NavigationState,} from 'react-navigation'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface Inputs {
  email: string
  password: string
}

interface ErrorMessage {
  email?: string
  password?: string
}

interface FormProps {
  name: keyof Inputs
  type: keyof Inputs
  label: string
  placeholder: string
  isRequired: boolean
  rules: any
}

export default function SignIn ({ navigation }: Props) {
  const [ loading, setLoading ] = useState<boolean>(false)
  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const  onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      // ログイン処理
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (e: any) {
      switch (e.code) {
        // メールアドレスが未認証の場合
        case 'UserNotConfirmedException':
          navigation.navigate('ConfirmSignUp', { email: data.email, password: data.password })
          break
        // ログインエラー
        case 'NotAuthorizedException':
          alert('IDまたはパスワードが間違っています')
          break
        default:
          throw(e)
      }
    } finally {
      setLoading(false)
    }
  }

  const inputs: FormProps[] = [
    {
      name: 'email',
      type: 'email',
      label:'メールアドレス',
      placeholder: '',
      isRequired: true,
      rules: {
        required: '必須入力です',
        pattern: {
          value: /.+@.+\..+/,
          message: '正しいメールアドレスを入力してください'
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      label:'パスワード',
      placeholder: '',
      isRequired: true,
      rules: {
        required: '必須入力です'
      }
    }
  ]

  return (
    <Center flex={1} px="3">
      <VStack width="90%" mx="4">
        <Heading
          size="lg"
          fontWeight="semibold"
          color="coolGray.800"
          mb="8"
          style={{ alignSelf: "center" }}
        >
          ログイン
        </Heading>
        {inputs.map(input => (
          <Controller
            key={input.name}
            control={control}
            rules={input.rules}
            name={input.name}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                isRequired={input.isRequired}
                isInvalid={input.name in errors}
                mt="2"
              >
                <FormControl.Label _text={{bold: true}}>{input.label}</FormControl.Label>
                <Input
                  type={input.type}
                  placeholder=""
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {input.name in errors && (
                  <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                    {errors[input.name as keyof ErrorMessage]?.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />
        ))}
        <Button
          mt="8"
          isLoading={loading}
          onPress={handleSubmit(onSubmit)}
        >
          ログイン
        </Button>
        <Link
          mt="8"
          _text={{
            color: "darkBlue.500",
            fontSize: "sm"
          }}
          alignSelf="center"
        >
          パスワードを忘れた場合はこちら
        </Link>
        <Link
          mt="8"
          _text={{
            color: "darkBlue.500",
            fontSize: "sm"
          }}
          alignSelf="center"
          onPress={() => navigation.navigate('SignUp')}
        >
          会員登録はこちら
        </Link>
      </VStack>
    </Center>
  )
}