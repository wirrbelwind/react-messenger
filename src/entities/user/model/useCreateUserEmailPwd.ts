import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import firebase from 'shared/api/'


export function useCreateUserEmailPwd() {
  const hook = useCreateUserWithEmailAndPassword(firebase.authModule)
  return hook
}