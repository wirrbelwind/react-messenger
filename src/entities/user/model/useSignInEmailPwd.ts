import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import firebase from 'shared/api/'

export function useSigninEmailPwd() {
  const hook = useSignInWithEmailAndPassword(firebase.authModule)
  return hook
}
