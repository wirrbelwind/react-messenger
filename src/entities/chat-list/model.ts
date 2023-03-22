import { useQuery } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { IChat } from "shared/types"
import { fetchChatList } from "./lib"

export const useList = (uid: string | undefined) => {
	return useQuery<IChat[]>({
		queryFn: () => fetchChatList(uid),
		queryKey: tanstackKeys.CHATLIST.GET_LIST,
		enabled: !!uid
	})
}