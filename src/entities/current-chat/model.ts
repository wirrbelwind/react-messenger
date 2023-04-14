import { useQuery } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { getUser } from "shared/api/firebase"
import { queryCurrentChat } from "./lib"

export const useCurrentChat = (chatID: string | undefined | null) => {
	const uid = getUser()?.uid

	return useQuery({
		enabled: (!!chatID && !!uid),
		queryFn: () => queryCurrentChat(chatID!, uid!),
		queryKey: tanstackKeys.ACTUAL_CHAT.GET(chatID!),
	})
}