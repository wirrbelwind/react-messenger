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
import { sendMsgModel } from "features/send-message";


export const ChatPage = () => {
	const chatID = useParams<'chatID'>().chatID ?? ''

	const sendMsg = useCreateMessage(chatID)
	const [queue, setQueue] = useState<IPendingMessage[]>([])

	const addMessage = async (newMsg: IPendingMessage) => {
		console.log('start add msg');

		setQueue(prev => [...prev, newMsg])
		await sendMsg.mutateAsync({ msg: newMsg })
		setQueue(prev => prev.filter(msg => msg.timestamp.toMillis() !== newMsg.timestamp.toMillis()))

		console.log('end add msg');
	}
	// queue logic

	const isChat = !!chatID
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
							msgQueue={queue}
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