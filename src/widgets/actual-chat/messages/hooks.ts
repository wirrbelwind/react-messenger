import { messagesModel } from "entities/messages"
import { IMessage, IPendingMessage } from "shared/libs/types"

export function useMsgAndQueueMsg(chatID: string, queue: IPendingMessage[] | undefined) {
	const existingMsgs = messagesModel.useMessages(chatID)
	if (chatID && existingMsgs.isSuccess) {
		const allMessages: Array<IMessage | IPendingMessage> = existingMsgs.data
		if (queue) allMessages.push(...queue)

		return {
			data: allMessages
		}
	}
}