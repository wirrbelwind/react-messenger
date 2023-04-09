import { useState } from "react";
import { BehaviorSubject } from "rxjs";
import { IPendingMessage } from "shared/libs/types";
import { useCreateMessage } from "./lib";

export function useMsgSendingQueue(chatID: string) {

	const msgQueue = new BehaviorSubject<IPendingMessage[]>([]);
	const queueState = useState(msgQueue.getValue())

	const sendMessage = useCreateMessage(chatID);

	msgQueue.subscribe(async (queue) => {
		if (queue.length > 0) {
			const message = queue[0];
			// Send message to backend API
			await sendMessage.mutateAsync({ msg: message })
			// Remove the sent message from the queue
			msgQueue.next(queue.slice(1));
			queueState[1](prev => prev.slice(1))
		}
	})

	return {
		state: queueState[0],
		addMessage: (newMsg: IPendingMessage) => {
			msgQueue.next([...msgQueue.value, newMsg])
			queueState[1](prev => [...prev, newMsg])
		},
		undoMessage: () => { }
	}
}