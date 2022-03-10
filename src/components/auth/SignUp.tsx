import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Center, Heading, VStack, FormControl, Input, Button, Link } from 'native-base'

import { NavigationParams, NavigationScreenProp, NavigationState,} from 'react-navigation'
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface Inputs {
  email: string
  password: string
  comfirmPassword: string
}

interface ErrorMessage {
  email?: string
  password?: string
  comfirmPassword?: string
}

interface FormProps {
  name: keyof Inputs
  type: keyof Inputs
  label: string
  placeholder: string
  isRequired: boolean
  helperText?: string
  rules: any
}

export default function SignUp({ navigation }: Props) {
  const [ loading, setLoading ] = useState<boolean>(false)
  const { control, handleSubmit, formState: { errors }, getValues, setError } = useForm<Inputs>()

  const  onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      // サインアップ処理
      await new Promise(resolve => setTimeout(resolve, 500))
      navigation.navigate('ConfirmSignUp', { email: data.email, password: data.password })
    } catch (e: any) {
      switch (e.code) {
        // 登録済みの場合
        case 'UsernameExistsException':
          setError('email', { type: "manual", message: 'すでに登録されているメールアドレスです' })
          break
        default:
          throw e
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
      helperText: '英数字8文字以上',
      rules: {
        required: '必須入力です',
        minLength: {
          value: 8,
          message: '8文字以上入力してください'
        },
        pattern: {
          value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
          message: '半角英数字と記号のみを入力してください'
        }
      }
    },
    {
      name: 'comfirmPassword',
      type: 'password',
      label:'パスワード(確認)',
      placeholder: '',
      isRequired: true,
      rules: {
        required: '必須入力です',
        validate: (v: string) => v === getValues('password') || 'パスワードと同じ値を入力してください'
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
          会員登録
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
                {input.helperText && (
                  <FormControl.HelperText _text={{fontSize: 'xs'}}>
                    {input.helperText}
                  </FormControl.HelperText>
                )}
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
          登録
        </Button>
        <Link
          mt="8"
          _text={{
            color: "darkBlue.500",
            fontSize: "sm"
          }}
          alignSelf="center"
          onPress={() => navigation.navigate('SignIn')}
        >
          ログインはこちら
        </Link>
      </VStack>
    </Center>
  )
}