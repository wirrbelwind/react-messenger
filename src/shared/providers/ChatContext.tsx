import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { green, lightGreen } from '@mui/material/colors';
import React, { FC, Suspense, useContext } from 'react';

const Context = React.createContext<string | null | undefined>(null)

export const useChatID = () => useContext(Context)

interface Props {
  children: React.ReactNode
  chatID: string | null | undefined
}

export const ChatIDContext: FC<Props> = ({ children, chatID }) => {
  return (
    <Context.Provider value={chatID}>
      {children}
    </Context.Provider>
  )
}