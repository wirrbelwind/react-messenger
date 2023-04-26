import { styled, Grid, Box } from "@mui/material"
import { CreateMessage } from "widgets/actual-chat/create-message"
import { ChatHeader } from "widgets/actual-chat/header"
import { ChatMessages } from "widgets/actual-chat/messages"

// styled
export const GridContainer = styled(Grid)({
	height: '100dvh'
})
export const ChatContainer = styled(Grid)({
	display: 'flex',
	flexDirection: 'column',
	height: '100%'
})
export const Header = styled(ChatHeader)({
	flexGrow: 0,
	flexShrink: 1
})
export const Messages = styled(ChatMessages)({
	flexGrow: 1
})
export const CreateMsgFooter = styled(CreateMessage)({
	flexGrow: 0,
	flexShrink: 1
})