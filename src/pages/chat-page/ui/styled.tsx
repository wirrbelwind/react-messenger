import { styled, Grid, Box } from "@mui/material"
import { CreateMessageWidget } from "widgets/create-message"
import { ChatHeaderWidget } from "widgets/header"
import { ChatMessagesWidget } from "widgets/messages"

// styled
export const GridContainer = styled(Grid)({
	height: '100dvh'
})
export const ChatContainer = styled(Grid)({
	display: 'flex',
	flexDirection: 'column',
	// flexBasis: '100%'
})
export const Header = styled(ChatHeaderWidget)({
	flexGrow: 0,
	flexShrink: 1
})
export const Messages = styled(ChatMessagesWidget)({
	flexGrow: 1,
	flexShrink: 0
})
export const CreateMsgFooter = styled(CreateMessageWidget)({
	flexGrow: 0,
	flexShrink: 1
})