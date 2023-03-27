import { Box } from "@mui/material";
import { Message, messagesModel } from "entities/messages"
import { FC } from "react"
import { BehaviorSubject } from "rxjs";
import { IPendingMessage } from "shared/libs/types";

interface ChatMessagesrProps {
	chatID: string
	msgQueue?: BehaviorSubject<IPendingMessage[]>
	msgQueueState?: [IPendingMessage[], React.Dispatch<React.SetStateAction<IPendingMessage[]>>]
}

export const ChatMessages: FC<ChatMessagesrProps> = ({ chatID, msgQueue, msgQueueState }) => {

	const messages = messagesModel.useMessages(chatID)
	if (messages.isSuccess) console.log(messages.data);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'scroll' }}>
			{messages.isSuccess &&
				messages.data.map(msg => <Message
					message={msg}
					onContextMenu={(e) => { e.preventDefault(); alert(msg.id) }}
					key={msg.id}
				/>)
			}
			{
				msgQueueState && msgQueueState[0].map(msg => <Message
					isPending={true}
					message={msg}
					key={msg.timestamp.toMillis()} />)
			}
		</Box>
	)
}