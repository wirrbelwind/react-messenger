import { Paper, Typography } from '@mui/material'
import AvatarChat from "./AvatarChat";
import { IChat } from "shared/libs/interfaces/chats";

interface ChatInfoProps {
	chat: IChat
}
export const ChatInfo = (props: ChatInfoProps) => {
	const { chat } = props

	return (
		<Paper>
			<AvatarChat name={chat.name} src={chat.photoURL} />
			<Typography>{chat.name}</Typography>
			<Typography>{chat.users.length} участников(-а)</Typography>
		</Paper>
	)
}