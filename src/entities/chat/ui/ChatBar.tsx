import { Avatar, Paper, Typography } from '@mui/material'
import { isGroupChat } from "shared/libs/interfaces/helpers/isGroupChat";
import { isPrivateChat } from "shared/libs/interfaces/helpers/isPrivateChat";
import AvatarChat from "./AvatarChat";
import { IChat } from "shared/libs/interfaces/chats";

interface CurrentChatBarProps {
	chat: IChat
}
export const CurrentChatBar = (props: CurrentChatBarProps) => {
	const { chat } = props

	return (
		<Paper>
			<AvatarChat name={chat.name} src={chat.photoURL} />
			<Typography>{chat.name}</Typography>
		</Paper>
	)
}