import { authModule } from "shared/api/firebase";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignOut as useSignOutFirebase } from 'react-firebase-hooks/auth'

export function useCreateUser() {
  const hook = useCreateUserWithEmailAndPassword(authModule)
  return hook
}

export function useSignin() {
  const hook = useSignInWithEmailAndPassword(authModule)
  return hook
}

export function useSignOut() {
  const hook = useSignOutFirebase(authModule)
  return hook
}