import { Avatar, Box, TextField, Typography } from '@mui/material'
import { actualChatInfoModel } from 'entities/actual-chat'
import { FC } from 'react'
import { useParams } from 'react-router'
import { stringToAvatar } from 'shared/libs/string/stringToAvatar'
import { IChat } from 'shared/types'

interface ChatHeaderProps {
	chatID: string
}

export const ChatHeader: FC<ChatHeaderProps> = ({ chatID }) => {

	const chat = actualChatInfoModel.useChat(chatID)
	if (chat.isSuccess) console.log(chat.data);

	// show avatar, name, countParty or status of companion
	return (
		<Box sx={{display: 'flex', border: '1px solid black'}}>
			{chat.isSuccess && <>
				<Avatar {...stringToAvatar(chat.data.companion?.name || chat.data.group?.name || '?')} />
				<Typography>{chat.data.companion?.name || chat.data.group?.name}</Typography>
			</>
			}

			{chat.isError &&
				<Typography>Error</Typography>
			}
			{chat.isFetching &&
				<Typography>fetching</Typography>
			}
		</Box>
	)
}