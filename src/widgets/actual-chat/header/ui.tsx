import { Avatar, Box, BoxProps, TextField, Typography } from '@mui/material'
import { chatModel } from 'entities/current-chat'
import { FC } from 'react'
import { useParams } from 'react-router'
import { stringToAvatar } from 'shared/libs/stringToAvatar'
import { IChat } from 'shared/libs/types'

interface ChatHeaderProps extends BoxProps {
	chatID: string
}

export const ChatHeader: FC<ChatHeaderProps> = ({ chatID }) => {
	return (
		<Box sx={{
			display: 'flex',
			border: '1px solid black',
			padding: '5px'
		}}>
			{chat.isSuccess && chat.data && <>

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