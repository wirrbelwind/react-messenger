import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useMutation, useQuery } from '@tanstack/react-query';
import { tanstackKeys } from "shared/consts/tanstack-keys";
import { useEffect, useState } from "react";
import { authModule } from "shared/firebase";


export const createUser = () => useMutation<unknown, unknown, { email: string, pwd: string }>
  ({
    mutationFn: ({ email, pwd }) => createUserWithEmailAndPassword(authModule, email, pwd)
      .then(res => res.user)
      .catch(reason => {
        throw new Error(reason.message)
      }),

    mutationKey: tanstackKeys.USER.CREATE
  })

export const signin = () => useMutation<unknown, unknown, { email: string, pwd: string }>
  ({
    mutationFn: ({ email, pwd }) => signInWithEmailAndPassword(authModule, email, pwd)
      .then(res => res.user)
      .catch(reason => {
        throw new Error(reason.message)
      }),

    mutationKey: tanstackKeys.USER.SIGNIN
  })

export const logout = () => useMutation({
  mutationFn: () => signOut(authModule)
    .then()
    .catch(reason => {
      throw new Error(reason.message)
    }),

  mutationKey: tanstackKeys.USER.SIGN_OUT
})

