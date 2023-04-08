import { Avatar, Box, ListItem, ListItemAvatar, ListItemProps, ListItemText, Paper, styled, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import { getUser } from "shared/firebase"
import { formatDate } from "shared/libs/formatDate"
import { IChat, isGroupChat, isPrivateChat } from "shared/libs/types"
import { ChatName, Container, LastMsg, DateText, StatusText } from "./styled"

interface Props {
	viewerID?: string | null
	chat: IChat
}


export const ChatBar = ({ viewerID, chat }: Props) => {
	const theme = useTheme()

	const isGroup = isGroupChat(chat)
	const isPrivate = isPrivateChat(chat)

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
				secondary={chat.name}
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