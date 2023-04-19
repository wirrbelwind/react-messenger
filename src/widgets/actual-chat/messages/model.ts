import { messagesModel } from "entities/messages"
import { IMessage, IPendingMessage } from "shared/libs/types"
import { useMemo } from 'react'

export function useMsgAndQueueMsg(chatID: string, queue: IPendingMessage[] | undefined) {
	return useMemo(() => {
		const existingMsgs = messagesModel.useMessages(chatID)
		if (chatID && existingMsgs.isSuccess) {
			const allMessages: Array<IMessage | IPendingMessage> = existingMsgs.data
			if (queue) allMessages.push(...queue)

			return {
				data: allMessages
			}
		}
	}, [chatID, queue])
}