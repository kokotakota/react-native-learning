import Profile from '~/components/Profile'
import Authenticator from '~/components/auth/Authenticator'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'

export default function Account () {
  const user = useSelector((state: RootState) => state.user)
  return (
    <>
      {user.id ? (
        <Profile />
      )
      : (
        <Authenticator />
      )}
    </>
  )
}