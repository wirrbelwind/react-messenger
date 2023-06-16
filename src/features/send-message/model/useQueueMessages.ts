import { useState } from 'react'
import { IPendingMessage } from "shared/libs/interfaces/messages"

type ISendMsg = (payload: { msg: IPendingMessage }) => Promise<void>

export const useQueueMessages = (sendMsg: ISendMsg) => {
	const [queue, setQueue] = useState<IPendingMessage[]>([])

	const sendMessage = async (newMsg: IPendingMessage) => {
		setQueue(prev => [...prev, newMsg])
		await sendMsg({ msg: newMsg })
		setQueue(prev => prev.filter(msg => msg.timestamp.toMillis() !== newMsg.timestamp.toMillis()))
	}

	return {
		queue,
		sendMessage
	}
}
