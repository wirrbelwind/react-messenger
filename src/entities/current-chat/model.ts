import { useQuery } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { queryCurrentChat } from "./lib/querryCurrentChat"

export const useCurrentChat = (
	chatID: string | undefined | null,
	userID: string | undefined
) => {

	return useQuery({
		enabled: (!!chatID && !!userID),
		queryFn: () => queryCurrentChat(chatID!, userID!),
		queryKey: tanstackKeys.ACTUAL_CHAT.GET(chatID!),
	})
}
