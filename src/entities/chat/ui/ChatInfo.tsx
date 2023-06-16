import { Paper, Typography } from '@mui/material'
import AvatarChat from "./AvatarChat";
import { IChat } from "shared/libs/interfaces/chats";
import { FirebaseError } from 'firebase/app';

interface ChatInfoEntityProps {
	chat: IChat
	// modal
}
export const ChatInfoEntity = (props: ChatInfoEntityProps) => {
	const { chat } = props

	return (
		<Paper>
			<AvatarChat name={chat.name} src={chat.photoURL} />
			<Typography>{chat.name}</Typography>
			<Typography>{chat.users.length} participants</Typography>
		</Paper>
	)
}