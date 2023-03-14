import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { getUser } from "shared/firebase"
import { ChatBriefing } from "shared/types"
import { isDirectChat, isGroupChat } from "../lib"

interface Props {
	viewerID: number
	chat: ChatBriefing
}

export const ChatBar = ({ viewerID, chat }: Props) => {
	const data = {
		name: null,
		photoURL: null,
		lastMessage: null,
		timestamp: null
	}

	
	return (<h1>123</h1>
		// <ListItem alignItems="flex-start">
		// 	{/* Avatar column */}
		// 	<ListItemAvatar>
		// 		<Avatar alt={chat.id} src={chat.id} />
		// 	</ListItemAvatar>

		// 	{/* column of primary text: name of chat and text of message */}
		// 	<ListItemText
		// 		primary={name}
		// 		secondary={
		// 			lastMessage &&
		// 			<Typography
		// 				sx={{ display: 'inline' }}
		// 				component="span"
		// 				variant="body2"
		// 				color="text.primary"
		// 			>
		// 				{
		// 					lastMessage.client_id === viewerID && 'You: '
		// 				}
		// 				{
		// 					(lastMessage.client_id !== viewerID && type === 'group') &&
		// 					lastMessage.sender_name
		// 				}
		// 				{lastMessage.text_content}
		// 			</Typography>

		// 		}
		// 	/>
		// 	{
		// 		lastMessage &&
		// 		<ListItemText
		// 			primary={lastMessage.send_date}
		// 			secondary={unreadCount}
		// 		/>
		// 	}
		// </ListItem>
	)
}