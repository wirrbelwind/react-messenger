import { Grid } from "@mui/material";
import { ChatList } from "widgets/chat-list";
import { Sidebar } from "shared/ui/Sidebar";
import { useParams } from "react-router";
import { ChatIDContext } from "shared/providers/ChatContext";
import { useMsgQueue } from "features/send-message/model";
import { ChatContainer, CreateMsgFooter, GridContainer, Header, Messages } from "./styled";
import { NotChatAlert } from "./NotChatAlert";
import { BehaviorSubject } from "rxjs";
import { IPendingMessage } from "shared/libs/types";
import { useState, useEffect } from 'react';
import { useCreateMessage } from "features/send-message/lib";

export const ChatPage = () => {
	const chatID = useParams<'chatID'>().chatID ?? ''


	// const msgQueue = useMsgQueue(chatID)
	// console.log('chat page render', msgQueue);

	// queue logic
	const msgQueue = new BehaviorSubject<IPendingMessage[]>([])
	const queueState = useState(msgQueue.getValue())

	const sendMessage = useCreateMessage(chatID)

	useEffect(() => {
		msgQueue.subscribe(async (queue) => {
			if (queue.length > 0) {
				const message = queue[0]
				// Send message to backend API
				await sendMessage.mutateAsync({ msg: message })
				// Remove the sent message from the queue
				msgQueue.next(queue.slice(1));
				queueState[1](prev => prev.slice(1))
			}
		})
	}, [])

	const addMessage = (newMsg: IPendingMessage) => {
		msgQueue.next([...msgQueue.value, newMsg])
		queueState[1](prev => [...prev, newMsg])
	}
	// queue logic

	const isChat = !!chatID && !!msgQueue
	return (
		<ChatIDContext chatID={chatID}>
			<GridContainer container>

				<Grid
					item
					xs={4}
					component={Sidebar}
					title="Chats"
					withNavigation={true}
					body={<ChatList />}
				/>

				<Grid
					item
					xs={7}
					component={ChatContainer}
				>
					{!chatID && <NotChatAlert />}

					{isChat && <>
						<Header chatID={chatID} />

						<Messages
							chatID={chatID}
							msgQueue={queueState[0]}
						/>

						<CreateMsgFooter
							chatID={chatID}
							sendMsg={addMessage}
						/>
					</>
					}
				</Grid>
			</GridContainer >
		</ChatIDContext>
	)
}