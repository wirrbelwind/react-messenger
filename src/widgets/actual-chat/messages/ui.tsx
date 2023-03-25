import { Box } from "@mui/material";
import { Message, messagesModel } from "entities/messages"
import { FC } from "react"

interface ChatMessagesrProps {
	chatID: string
}

export const ChatMessages: FC<ChatMessagesrProps> = ({ chatID }) => {

	const messages = messagesModel.useMessages(chatID)
	if (messages.isSuccess) console.log(messages.data);



	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			{messages.isSuccess &&
				messages.data.map(msg => {
					console.log(msg);

					return <Message
						message={msg}
						onContextMenu={(e) => { e.preventDefault(); alert(msg.id) }}
						key={msg.id}
					/>
				})
			}
		</Box>
	)
}