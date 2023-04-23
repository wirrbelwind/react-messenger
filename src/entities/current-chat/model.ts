import { useQuery } from "@tanstack/react-query"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { db, getUser } from "shared/api/firebase"
import { IChat, RawChat } from "shared/libs/types"
import { doc, getDoc } from "firebase/firestore"
import { formatRawChat } from "shared/libs/formatRawChat"
import { fetchCompanion } from "shared/libs/fetchCompanion"

export const useCurrentChat = (chatID: string | undefined | null) => {
	const uid = getUser()?.uid

	return useQuery({
		enabled: (!!chatID && !!uid),
		queryFn: () => queryCurrentChat(chatID!, uid!),
		queryKey: tanstackKeys.ACTUAL_CHAT.GET(chatID!),
	})
}
