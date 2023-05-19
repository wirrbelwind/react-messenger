import { Avatar, ListItemAvatar, ListItemText } from "@mui/material"
import { Link } from "react-router-dom"
import { ChatName, Container, DateText } from "./styled"
import { IChat } from "shared/libs/interfaces/chats"
import { IMessage } from "shared/libs/interfaces/messages"
import { formatDate } from "shared/libs/utils/formatDate"
import AvatarChat from "entities/chat/ui/AvatarChat"

interface ChatBarEntityProps {
	viewerID?: string | null
	chat: IChat
	lastMsg?: IMessage
}


export const ChatBarEntity = (props: ChatBarEntityProps) => {
	const { viewerID, chat, lastMsg } = props

	const lastMsgDate = lastMsg ? formatDate(lastMsg?.timestamp.seconds) : undefined

	let lastMsgTxt = lastMsg?.text || undefined
	if (lastMsgTxt && lastMsg?.sender.id === viewerID) lastMsgTxt = `You: ${lastMsgTxt}`

	return (
		<Container
			component={Link}
			to={`/${chat.id}`}
		>
			{/* Avatar column */}
			<ListItemAvatar>
				<AvatarChat name={chat.name} src={chat.photoURL} />
			</ListItemAvatar>

			{/* column of primary text: name of chat and text of message */}
			<ListItemText
				primary={<ChatName>{chat.name}</ChatName>}
				secondary={lastMsgTxt}
			/>
			{
				(lastMsg && lastMsgDate)
				&&
				<ListItemText
					primary={<DateText>{lastMsgDate}</DateText>}
					secondary={lastMsg.status}
				/>
			}
		</Container >
	)
}