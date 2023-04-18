import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { useState } from "react"
import { BehaviorSubject } from "rxjs"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { getUser } from "shared/api/firebase"
import { IMessage, IPendingMessage } from "shared/libs/types"
import { fetchMessages } from "./lib"

export const useMessages = (chatID: string): UseQueryResult<IMessage[]> => {
	const client = useQueryClient()
	return useQuery<IMessage[]>({
		queryFn: () => fetchMessages(chatID, client),
		queryKey: tanstackKeys.MESSAGES.GET(chatID),
	})
}