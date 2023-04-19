import { Box, BoxProps, Typography } from '@mui/material'
import { CurrentChatBar, currentChatModel } from 'entities/current-chat'
import { FC } from 'react'
import { styled } from "@mui/material";

const Container = styled(Box)({
	display: 'flex',
	border: '1px solid black',
	padding: '5px'
})

interface ChatHeaderProps extends BoxProps {
	chatID: string
}

export const ChatHeader: FC<ChatHeaderProps> = ({ chatID }) => {
	const chat = currentChatModel.useCurrentChat(chatID)

	return (
		<Container>
			{chat.isSuccess &&
				<CurrentChatBar chat={chat.data} />
			}

			{chat.isError &&
				<Typography>Error</Typography>
			}
			{chat.isFetching &&
				<Typography>fetching</Typography>
			}
		</Container>
	)
}