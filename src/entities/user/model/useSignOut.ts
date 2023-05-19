import { useSignOut as useSignOutFirebase } from 'react-firebase-hooks/auth'
import firebase from 'shared/api/'

export function useSignOut() {
  const hook = useSignOutFirebase(firebase.authModule)
  return hook
}
