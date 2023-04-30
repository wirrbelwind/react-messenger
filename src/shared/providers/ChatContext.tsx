import React, { FC, useContext } from 'react';

const Context = React.createContext<string | null | undefined>(null)

export const useChatID = () => useContext(Context)
interface ChatIDContextProps {
  children: React.ReactNode
  chatID: string | null | undefined
}

export const ChatIDContext: FC<ChatIDContextProps> = ({ children, chatID }) => {
  return (
    <Context.Provider value={chatID}>
      {children}
    </Context.Provider>
  )
}