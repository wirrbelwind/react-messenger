import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useMutation, useQuery } from '@tanstack/react-query';
import { tanstackKeys } from "shared/consts/tanstack-keys";
import { useEffect, useState } from "react";
import { authModule, getUser } from "shared/firebase";


export const createUser = () => useMutation<unknown, unknown, { email: string, pwd: string }>
  ({
    mutationFn: ({ email, pwd }) => createUserWithEmailAndPassword(authModule, email, pwd),
    mutationKey: tanstackKeys.USER.CREATE
  })

export const signin = () => useMutation<unknown, unknown, { email: string, pwd: string }>
  ({
    mutationFn: ({ email, pwd }) => signInWithEmailAndPassword(authModule, email, pwd),
    mutationKey: tanstackKeys.USER.SIGNIN
  })

export const logout = () => {
  const user = getUser()

  return useMutation({
    mutationFn: () => signOut(authModule),
    mutationKey: tanstackKeys.USER.SIGN_OUT,
    
  })
}