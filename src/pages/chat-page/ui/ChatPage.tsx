import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { ChatContainer, CreateMsgFooter, GridContainer, Header, Messages } from "./styled";
import { NotChatAlert } from "./NotChatAlert";
import { userModel } from "entities/user";
import { SidebarWidget } from 'widgets/sidebar'
import { ChatListWidget } from "widgets/chat-list";
import { useCreateMessage } from "features/send-message/lib";
import { IPendingMessage } from "shared/libs/interfaces/messages";
import { useState } from 'react'

export const ChatPage = () => {
	const chatID = useParams<'chatID'>().chatID
	const { user } = userModel.useUser()
	const sendMsg = useCreateMessage(chatID)
	const [queue, setQueue] = useState<IPendingMessage[]>([])

	const addMessage = async (newMsg: IPendingMessage) => {
		setQueue(prev => [...prev, newMsg])
		await sendMsg.mutateAsync({ msg: newMsg })
		setQueue(prev => prev.filter(msg => msg.timestamp.toMillis() !== newMsg.timestamp.toMillis()))
	}
	// queue logic

	const isChatExists = !!chatID
	return (
		<GridContainer container>

			<Grid
				item
				xs={4}
				component={SidebarWidget}
				title="Chats"
				body={user?.uid && <ChatListWidget userID={user.uid} />}
			/>

			<Grid item xs={7}>
				<ChatContainer>
					{!isChatExists && <NotChatAlert />}

					{isChatExists && <>
						<Header chatID={chatID} />
						<Messages chatID={chatID} />

						<CreateMsgFooter
							chatID={chatID}
							sendMsg={addMessage}
						/>
					</>
					}
				</ChatContainer>
			</Grid>
		</GridContainer >
	)
}