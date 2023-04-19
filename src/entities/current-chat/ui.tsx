import { Avatar, Paper, Typography } from "@mui/material";
import { useChatID } from "shared/providers/ChatContext";
import { stringToAvatar } from "shared/libs/stringToAvatar";
import { useCurrentChat } from "./model";
import { IChat } from "shared/libs/types";
import { FC } from 'react'
interface CurrentChatBarProps {
	chat: Omit<IChat, 'lastMessage'>
}
export const CurrentChatBar: FC<CurrentChatBarProps> = ({ chat }) => {
	return (
		<Paper>
			<Avatar {...stringToAvatar(chat.name)} />
			<Typography>{chat.name}</Typography>
		</Paper>
	)
}