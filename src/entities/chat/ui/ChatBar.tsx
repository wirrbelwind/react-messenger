import styled from "@emotion/styled"
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Paper, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import { getUser } from "shared/firebase"
import { formatDate } from "shared/libs/formatDate"
import { IChat, isGroupChat, isPrivateChat } from "shared/libs/types"

interface Props {
	viewerID?: string | null
	chat: IChat
}

export const ChatBar = ({ viewerID, chat }: Props) => {
	const theme = useTheme()

	const isGroup = isGroupChat(chat)
	const isPrivate = isPrivateChat(chat)

	return (
		<ListItem
			sx={{ ':hover': theme.palette.background.paper }}
			component={Link}
			to={`/${chat.id}`}
		>
			{/* Avatar column */}
			<ListItemAvatar>
				<Avatar alt={chat.id} src={chat.photoURL} />
			</ListItemAvatar>

			{/* column of primary text: name of chat and text of message */}
			<ListItemText
				primary={<Typography
					variant="body1"
					color='primary.dark'
				>
					{chat.name}
				</Typography>}

				secondary={
					chat.lastMessage &&
					<Typography
						variant="body2"
						color='primary'
					>
						{
							chat.lastMessage.senderID.id === viewerID
							&&
							'You: '
						}

						{chat.lastMessage.text}
					</Typography>

				}
			/>
			{chat.lastMessage &&
				<ListItemText
					primary={formatDate(chat.lastMessage?.timestamp.seconds)}
					secondary={chat.lastMessage?.status}
				/>
			}
		</ListItem>
	)
}