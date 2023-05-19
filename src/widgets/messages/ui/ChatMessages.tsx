import { Box } from "@mui/material";
import { FC, useEffect } from "react"
import { styled } from '@mui/material'
import { NoMessagesAlert } from "./NoMessagesAlert";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Unsubscribe, collection, doc, orderBy, query, where } from "firebase/firestore";
import { IMessage, IPendingMessage } from "shared/libs/interfaces/messages";
import { messagesModel } from "entities/messages";
import { MessageEntity } from "entities/messages";

interface ChatMessagesWidgetProps {
	chatID: string
	messagesQueue?: IPendingMessage[]
}

const Layout = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	// overflow: 'scroll'
})

export const ChatMessagesWidget: FC<ChatMessagesWidgetProps> = (props: ChatMessagesWidgetProps) => {
	const { chatID, messagesQueue } = props
	const [messages, loading, error] = messagesModel.useMessages(chatID)

	return (<Layout>
		{!messages && loading && <div>loading</div>}
		{!messages && error && <div>{error.message}</div>}

		{messages?.length === 0 && <NoMessagesAlert />}

		{messages &&
			messages.map(msg => <MessageEntity
				message={msg as IMessage}
				onContextMenu={(e) => { e.preventDefault(); alert(msg.text) }}
				key={msg.timestamp.toMillis()}
			/>)
		}

		{
			messagesQueue?.map(msg => <MessageEntity
				message={msg}
				onContextMenu={(e) => { e.preventDefault(); alert(msg.text) }}
				key={msg.timestamp.toMillis()}
				isPending={true}
			/>)
		}
	</Layout>)
}

