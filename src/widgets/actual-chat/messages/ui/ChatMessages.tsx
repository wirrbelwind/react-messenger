import { Box } from "@mui/material";
import { Message } from "entities/messages"
import { FC } from "react"
import { IPendingMessage } from "shared/libs/types";
import { styled } from '@mui/material'
import { useMsgAndQueueMsg } from "../hooks";
import { NoMessagesAlert } from "./NoMessagesAlert";

interface ChatMessagesrProps {
	chatID: string
	msgQueue?: IPendingMessage[]
}
const Container = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	overflow: 'scroll'
})

export const ChatMessages: FC<ChatMessagesrProps> = ({ chatID, msgQueue }) => {
	const msg = useMsgAndQueueMsg(chatID, msgQueue)

	return (
		<Container>
			{!msg && <NoMessagesAlert />}
			{msg &&
				msg.data.map(msg => <Message
					message={msg}
					onContextMenu={(e) => { e.preventDefault(); alert(msg.text) }}
					key={msg.timestamp.toMillis()}
				/>)
			}
		</Container>
	)
}

