import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { useState } from "react"
import { BehaviorSubject } from "rxjs"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { getUser } from "shared/firebase"
import { IMessage, IPendingMessage } from "shared/libs/types"
import { fetchMessages } from "./lib"

export const useMessages = (chatID: string): UseQueryResult<IMessage[]> => {

	return useQuery<IMessage[]>({
		queryFn: () => fetchMessages(chatID),
		queryKey: tanstackKeys.MESSAGES.GET(chatID),
	})
}