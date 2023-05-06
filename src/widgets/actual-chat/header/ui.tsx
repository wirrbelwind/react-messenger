import { Box, BoxProps, Typography } from '@mui/material'
import { CurrentChatBar, currentChatModel } from 'entities/chat'
import { FC } from 'react'
import { styled } from "@mui/material";
import { useUser } from 'shared/libs/hooks/useUser';
import { useEffect } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import firebase from 'shared/api';
import { useChat2 } from 'entities/chat/model';
import { IBaseChat, IGroupChatData } from 'shared/libs/interfaces/chats';

const Container = styled(Box)({
	display: 'flex',
	border: '1px solid black',
	padding: '5px'
})

interface ChatHeaderProps extends BoxProps {
	chatID: string
}

export const ChatHeader: FC<ChatHeaderProps> = ({ chatID }) => {
	const { user } = useUser()

	const chat = useChat2(chatID, user?.uid)
	if(chat) console.log(chat)


	return (
		<Container>
			{/* {chat &&
				<CurrentChatBar chat={chat} />
			}

			{error &&
				<Typography>Error</Typography>
			}
			{loading &&
				<Typography>fetching</Typography>
			} */}
		</Container>
	)
}