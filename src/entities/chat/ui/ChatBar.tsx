import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { getUser } from "shared/firebase"
import { formatDate } from "shared/libs/formatDate"
import { IChat } from "shared/types"
import { isGroupChat, isPrivateChat } from "../lib"

interface Props {
	viewerID?: string | null
	chat: IChat
}

export const ChatBar = ({ viewerID, chat }: Props) => {
	const isGroup = isGroupChat(chat)
	const isPrivate = isPrivateChat(chat)

	return (
		<Link to={`/${chat.id}`}>
			<ListItem
				sx={{ ":hover": { backgroundColor: 'lightgray' } }}
				alignItems="flex-start"
			>

				{/* Avatar column */}
				<ListItemAvatar>
					<Avatar alt={chat.id} src={chat.photoURL} />
				</ListItemAvatar>

				{/* column of primary text: name of chat and text of message */}
				<ListItemText
					primary={chat.name}

					secondary={
						chat.lastMessage &&
						<Typography
							sx={{ display: 'inline' }}
							component="span"
							variant="body2"
							color="black"
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
		</Link>

	)
}