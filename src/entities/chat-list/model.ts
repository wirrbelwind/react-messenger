import { useQuery } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { getUser } from "shared/api/firebase"
import { IChat } from "shared/libs/types"
import { queryChatList } from "./lib"

export const useChatList = () => {
	const uid = getUser()?.uid

	return useQuery<IChat[]>({
		enabled: !!uid,
		queryFn: () => queryChatList(uid!),
		queryKey: tanstackKeys.CHATLIST.GET_LIST
	})
}