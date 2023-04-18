import { Box, styled } from "@mui/material"
import { CreateMessage } from "../create-message"
import { ChatHeader } from "../header"
import { ChatMessages } from "../messages"
import { sendMsgModel } from "features/send-message"
import { useMemo } from "react"
import { useChatID } from "shared/providers/ChatContext"

const Container = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	height: '100%'
})
const Header = styled(ChatHeader)({
	flexGrow: 0,
	flexShrink: 1
})
const Messages = styled(ChatMessages)({
	flexGrow: 1
})
const CreateMsgFooter = styled(CreateMessage)({
	flexGrow: 0,
	flexShrink: 1
})

export const Chat = () => {
	const chatID = useChatID()

	const msgProc = useMemo(
		() => {
			if (chatID) return sendMsgModel.useMsgSendingQueue(chatID)
		},
		[chatID]
	)

	return (
		<Container>
			{!chatID &&
				<h1>nothing</h1>
			}

			{chatID && msgProc && <>
				<Header chatID={chatID} />

				<Messages
					chatID={chatID}
					msgQueueState={msgProc.state}
				/>

				<CreateMsgFooter
					chatID={chatID}
					sendMsg={msgProc.addMessage}
				/>
			</>
			}
		</Container>
	)
}