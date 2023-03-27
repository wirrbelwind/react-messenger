import { Box } from "@mui/material";
import { Message, messagesModel } from "entities/messages"
import { FC } from "react"
import { IPendingMessage } from "shared/libs/types";

interface ChatMessagesrProps {
	chatID: string
	msgQueue?: [IPendingMessage[], React.Dispatch<React.SetStateAction<IPendingMessage[]>>]
}

export const ChatMessages: FC<ChatMessagesrProps> = ({ chatID, msgQueue }) => {

	const messages = messagesModel.useMessages(chatID)
	if (messages.isSuccess) console.log(messages.data);



	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			{messages.isSuccess &&
				messages.data.map(msg => <Message
					message={msg}
					onContextMenu={(e) => { e.preventDefault(); alert(msg.id) }}
					key={msg.id}
				/>)
			}
			{
				msgQueue && msgQueue[0].length !== 0 &&
				msgQueue[0].map(msg => <Message
					isPending={true}
					message={msg}
					key={msg.timestamp.toMillis()} />)
			}
		</Box>
	)
}