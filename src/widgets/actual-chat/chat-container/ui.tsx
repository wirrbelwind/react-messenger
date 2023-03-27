import { Box } from "@mui/material"
import { messagesModel } from "entities/messages"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { IMessage, IPendingMessage } from "shared/libs/types"
import { CreateMessage } from "../create-message"
import { ChatHeader } from "../header"
import { ChatMessages } from "../messages"
import { BehaviorSubject } from 'rxjs';

export const Chat = () => {
	const { chatID } = useParams<'chatID'>()
	if (!chatID) return <h1>Nothing</h1>

	// const msgQueueState = useState<IPendingMessage[]>([])
	const messageQueue = new BehaviorSubject<IPendingMessage[]>([]);
	const queueState = useState(messageQueue.getValue())

	const sendMessage = messagesModel.useCreateMessage(chatID);

	messageQueue.subscribe(async (queue) => {
		if (queue.length > 0) {
			const message = queue[0];
			// Send message to backend API
			await sendMessage.mutateAsync({ msg: message })
			// Remove the sent message from the queue
			messageQueue.next(queue.slice(1));
			queueState[1](prev => prev.slice(1))
		}
	});

	// useEffect(() => {
	// 	console.log('START');

	// 	(async () => {
	// 		if (msgQueueState[0].length > 0) {
	// 			const message = msgQueueState[0][0];
	// 			// Send message to backend API
	// 			await sendMessage.mutateAsync({ msg: message })
	// 			// Remove the sent message from the queue
	// 			msgQueueState[1]((prevQueue) => prevQueue.slice(1));
	// 		}
	// 		console.log('END');
	// 	})()

	// }, [msgQueueState[0]])

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

			<Box sx={{ flexGrow: 0, flexShrink: 1 }}>
				<ChatHeader chatID={chatID} />
			</Box>

			<Box sx={{ flexGrow: 1 }} >
				<ChatMessages chatID={chatID} msgQueue={messageQueue} msgQueueState={queueState} />
			</Box>

			<Box sx={{ flexGrow: 0, flexShrink: 1 }}>
				<CreateMessage chatID={chatID} msgQueue={messageQueue} msgQueueState={queueState}/>
			</Box>
		</Box>
	)
}