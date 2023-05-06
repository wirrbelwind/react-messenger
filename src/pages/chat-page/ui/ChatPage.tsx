import { Grid } from "@mui/material";
import { ChatList } from "widgets/chat-list";
import { Sidebar } from "widgets/sidebar";
import { useParams } from "react-router";
import { ChatIDContext } from "shared/providers/ChatContext";
import { ChatContainer, CreateMsgFooter, GridContainer, Header, Messages } from "./styled";
import { NotChatAlert } from "./NotChatAlert";
import { useState } from 'react';
import { useCreateMessage } from "features/send-message/lib";


export const ChatPage = () => {
	const chatID = useParams<'chatID'>().chatID

	// const sendMsg = useCreateMessage(chatID)
	// const [queue, setQueue] = useState<IPendingMessage[]>([])

	// const addMessage = async (newMsg: IPendingMessage) => {
	// 	setQueue(prev => [...prev, newMsg])
	// 	await sendMsg.mutateAsync({ msg: newMsg })
	// 	setQueue(prev => prev.filter(msg => msg.timestamp.toMillis() !== newMsg.timestamp.toMillis()))
	// }
	// queue logic

	const isChat = !!chatID
	return (
		<ChatIDContext chatID={chatID}>
			<GridContainer container>

				{/* <Grid
					item
					xs={4}
					component={Sidebar}
					title="Chats"
					withNavigation={true}
					body={<ChatList />}
				/> */}

				<Grid
					item
					xs={7}
					component={ChatContainer}
				>
					{!chatID && <NotChatAlert />}

					{isChat && <>
						<Header chatID={chatID} />

						{/* <Messages
							chatID={chatID}
							msgQueue={queue}
						/> */}

						{/* <CreateMsgFooter
							chatID={chatID}
							sendMsg={addMessage}
						/> */}
					</>
					}
				</Grid>
			</GridContainer >
		</ChatIDContext>
	)
}