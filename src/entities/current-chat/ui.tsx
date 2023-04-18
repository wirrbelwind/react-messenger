import { Avatar, Paper, Typography } from "@mui/material";
import { useChatID } from "shared/providers/ChatContext";
import { stringToAvatar } from "shared/libs/stringToAvatar";
import { useCurrentChat } from "./model";

export function CurrentChatBar() {
	const chatID = useChatID()
	const chat = useCurrentChat(chatID)
	return (
		<Paper>
			<Avatar {...stringToAvatar(chat.data!.name)} />
			<Typography>{chat.data!.name}</Typography>
		</Paper>
	)
}