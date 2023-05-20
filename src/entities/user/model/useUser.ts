import firebase from 'shared/api/'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Viewer } from 'shared/libs/interfaces/users'

export const useUser = () => {
  const [user, loading, error] = useAuthState(firebase.authModule)

  return {
    user: user as Viewer,
    loading,
    error
  }
}
