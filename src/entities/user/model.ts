import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignOut as useSignOutFirebase } from 'react-firebase-hooks/auth'
import api from 'shared/api'

export function useCreateUser() {
  const hook = useCreateUserWithEmailAndPassword(api.auth)
  return hook
}

export function useSignin() {
  const hook = useSignInWithEmailAndPassword(api.auth)
  return hook
}

export function useSignOut() {
  const hook = useSignOutFirebase(api.auth)
  return hook
}