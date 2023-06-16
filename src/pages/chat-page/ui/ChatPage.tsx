import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { ChatContainer, CreateMsgFooter, GridContainer, Header, Messages } from "./styled";
import { NotChatAlert } from "./NotChatAlert";
import { userModel } from "entities/user";
import { SidebarWidget } from 'widgets/sidebar'
import { ChatListWidget } from "widgets/chat-list";
import { IPendingMessage } from "shared/libs/interfaces/messages";
import { useState } from 'react'
import { useMsgQueue } from "features/send-message/model";
import { sendMsgModel } from "features/send-message";

export const ChatPage = () => {
	const chatID = useParams<'chatID'>().chatID
	const { user } = userModel.useUser()
	const messagesMutation = sendMsgModel.useCreateMessage(chatID)
	const msgQueue = sendMsgModel.useQueueMessages(messagesMutation.mutateAsync)

	const isChatExists = !!chatID
	return (
		<GridContainer container>
			<Grid item xs={4} component={SidebarWidget} title="Chats"
				body={user?.uid && <ChatListWidget userID={user.uid} />} />

			<Grid item xs={7}>
				<ChatContainer>
					{!isChatExists && <NotChatAlert />}
					{isChatExists && <>
						<Header chatID={chatID} />
						<Messages chatID={chatID} messagesQueue={msgQueue.queue} />
						<CreateMsgFooter chatID={chatID} sendMsg={msgQueue.sendMessage} withSubmitBtn={true} />
					</>}
				</ChatContainer>
			</Grid>
		</GridContainer >)
}