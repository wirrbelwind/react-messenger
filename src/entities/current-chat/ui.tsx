import { Avatar, Paper, Typography } from "@mui/material";
import { stringToAvatar } from "shared/libs/stringToAvatar";
import { IChat } from "shared/libs/interfaces";
interface CurrentChatBarProps {
	chat: Omit<IChat, 'lastMessage'>
}
export const CurrentChatBar = ({ chat }: CurrentChatBarProps) => {
	return (
		<Paper>
			<Avatar {...stringToAvatar(chat.name)} />
			<Typography>{chat.name}</Typography>
		</Paper>
	)
}