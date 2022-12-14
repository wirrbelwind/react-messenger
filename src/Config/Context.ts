import { createContext, useContext } from "react";

export type GlobalContent = null
export const AppContext = createContext<GlobalContent>(null)
export const useGlobalContext = () => useContext(AppContext)