import { useQuery } from "@tanstack/react-query";
import { tanstackKeys } from "shared/consts/tanstack-keys";
import { fetchActualChatInfo } from "./lib";

export const useChat = (chatID: string) => {

	return useQuery({
		queryFn: () => fetchActualChatInfo(chatID),
		queryKey: tanstackKeys.ACTUAL_CHAT.GET(chatID)
	})
}