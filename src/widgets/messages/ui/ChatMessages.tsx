import { Box } from "@mui/material";
import { FC, useEffect, useRef } from "react"
import { styled } from '@mui/material'
import { NoMessagesAlert } from "./NoMessagesAlert";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Unsubscribe, collection, doc, orderBy, query, where } from "firebase/firestore";
import { IMessage, IPendingMessage } from "shared/libs/interfaces/messages";
import { messagesModel } from "entities/messages";
import { MessageEntity } from "entities/messages";
import { userModel } from "entities/user";

interface ChatMessagesWidgetProps {
	chatID: string
	messagesQueue?: IPendingMessage[]
}

const Layout = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	padding: '0 5px',
	alignItems: 'flex-start',
	overflowY: 'scroll'
})

export const ChatMessagesWidget: FC<ChatMessagesWidgetProps> = (props: ChatMessagesWidgetProps) => {
	const { chatID, messagesQueue } = props

	const { user } = userModel.useUser()

	const [regularMessages, loading, error] = messagesModel.useMessages(chatID)


	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [regularMessages?.length, messagesQueue?.length])

	return (<Layout>
		{!regularMessages && loading && <div>loading</div>}
		{!regularMessages && error && <div>{error.message}</div>}

		{regularMessages?.length === 0 && <NoMessagesAlert />}

		{regularMessages &&
			regularMessages.map(msg => {
				return (
					<MessageEntity
						message={msg as IMessage}
						onContextMenu={(e) => { e.preventDefault(); alert(msg.text) }}
						key={msg.timestamp.toMillis()}
						owned={msg.sender.id === user.uid}

					/>
				)
			})
		}

		{
			messagesQueue?.map(msg => <MessageEntity
				message={msg}
				onContextMenu={(e) => { e.preventDefault(); alert(msg.text) }}
				key={msg.timestamp.toMillis()}
				isPending={true}
			/>)
		}

		<div ref={scrollRef}></div>
	</Layout>)
}

