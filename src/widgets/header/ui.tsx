import { Box, BoxProps, Typography } from '@mui/material'
import { ChatInfoEntity, chatModel } from 'entities/chat'
import { FC } from 'react'
import { styled } from "@mui/material";
import { userModel } from 'entities/user';

const Container = styled(Box)({
	display: 'flex',
	border: '1px solid black',
	padding: '5px'
})

interface ChatHeaderWidgetProps extends BoxProps {
	chatID: string
}

export const ChatHeaderWidget: FC<ChatHeaderWidgetProps> = ({ chatID }) => {
	const { user } = userModel.useUser()
	const { chat, error, loading } = chatModel.useChat(chatID, user?.uid)
	return (<Container>{chat && <><ChatInfoEntity chat={chat} /></>}</Container>)}
