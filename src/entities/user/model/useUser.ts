import firebase from 'shared/api/'
import { useAuthState } from 'react-firebase-hooks/auth'

export const useUser = () => {
  const [user, loading, error] = useAuthState(firebase.authModule)

  return {
    user,
    loading,
    error
  }
}
