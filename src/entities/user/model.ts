import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useMutation, useQuery } from '@tanstack/react-query';
import { tanstackKeys } from "shared/consts/tanstack-keys";
import { useEffect, useState } from "react";
import { authModule, getUser } from "shared/api/firebase";


export const useCreateUser = () => useMutation<unknown, unknown, { email: string, pwd: string }>
  ({
    mutationFn: ({ email, pwd }) => createUserWithEmailAndPassword(authModule, email, pwd),
    mutationKey: tanstackKeys.USER.CREATE
  })

export const useSignin = () => useMutation<unknown, unknown, { email: string, pwd: string }>
  ({
    mutationFn: ({ email, pwd }) => signInWithEmailAndPassword(authModule, email, pwd),
    mutationKey: tanstackKeys.USER.SIGNIN
  })

export const useLogout = () => {
  const user = getUser()

  return useMutation({
    mutationFn: () => signOut(authModule),
    mutationKey: tanstackKeys.USER.SIGN_OUT,
    
  })
}