import { Box } from "@mui/material";
import { Message, messagesModel } from "entities/messages"
import { FC, useEffect } from "react"
import { IMessage, IPendingMessage } from "shared/libs/interfaces";
import { styled } from '@mui/material'
import { useMsgAndQueueMsg } from "../hooks";
import { NoMessagesAlert } from "./NoMessagesAlert";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { db } from "shared/api/firebase";
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
	const [messages] = messagesModel.useMessages2(chatID)

	return (
		<Container>
			{!messages && <NoMessagesAlert />}
			{
				messages?.map(msg => <Message
					message={msg as IMessage}
					onContextMenu={(e) => { e.preventDefault(); alert(msg.text) }}
					key={msg.timestamp.toMillis()}
				/>)
			}

			{
				msgQueue?.map(msg => <Message
					message={msg}
					onContextMenu={(e) => { e.preventDefault(); alert(msg.text) }}
					key={msg.timestamp.toMillis()}
					isPending={true}
				/>)
			}
		</Container>
	)
}

