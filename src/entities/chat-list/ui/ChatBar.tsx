import { Avatar, ListItemAvatar,  ListItemText } from "@mui/material"
import { Link } from "react-router-dom"
import { formatDate } from "shared/libs/formatDate"
import { IChat } from "shared/libs/types"
import { ChatName, Container, DateText } from "./styled"

interface Props {
	viewerID?: string | null
	chat: IChat
}


export const ChatBar = ({ viewerID, chat }: Props) => {
	const date = formatDate(chat.lastMessage?.timestamp.seconds)

	let lastMsgTxt = chat.lastMessage?.text || ''
	if (lastMsgTxt && chat.lastMessage?.senderID.id === viewerID) lastMsgTxt = 'You: ' + lastMsgTxt

	return (
		<Container
			component={Link}
			to={`/${chat.id}`}
		>
			{/* Avatar column */}
			<ListItemAvatar>
				<Avatar alt={chat.id} src={chat.photoURL} />
			</ListItemAvatar>

			{/* column of primary text: name of chat and text of message */}
			<ListItemText
				primary={<ChatName>{chat.name}</ChatName>}
				secondary={chat.lastMessage?.text}
			/>
			{
				chat.lastMessage &&
				<ListItemText
					primary={<DateText>{date}</DateText>}
					secondary={chat.lastMessage?.status}
				/>
			}
		</Container >
	)
}