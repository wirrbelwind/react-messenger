import { useQuery } from "@tanstack/react-query"
import { queryCurrentChat } from "./lib/querryCurrentChat"
import tanstackConfig from "shared/configs/tanstack.config"

export const useCurrentChat = (
	chatID: string | undefined | null,
	userID: string | undefined
) => {

	return useQuery({
		enabled: (!!chatID && !!userID),
		queryFn: () => queryCurrentChat(chatID!, userID!),
		queryKey: tanstackConfig.ACTUAL_CHAT.GET(chatID!),
	})
}
