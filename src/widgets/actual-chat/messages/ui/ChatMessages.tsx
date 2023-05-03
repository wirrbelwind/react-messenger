import { Box } from "@mui/material";
import { Message, messagesModel } from "entities/messages"
import { FC, useEffect } from "react"
import { styled } from '@mui/material'
import { useMsgAndQueueMsg } from "../hooks";
import { NoMessagesAlert } from "./NoMessagesAlert";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Unsubscribe, collection, doc, orderBy, query, where } from "firebase/firestore";
import { IMessage, IPendingMessage } from "shared/libs/interfaces/messages";

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
	const messages = messagesModel.useMessages(chatID)

	useEffect(() => {
		const subcription = messages.data?.subscription
		let unsub: null | Unsubscribe = null;

		if (subcription) unsub = subcription()

		return () => {
			if (unsub) unsub()
		}
	}, [])

	return (
		<Container>
			{!messages && <NoMessagesAlert />}
			{
				messages?.data?.messages.map(msg => <Message
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

