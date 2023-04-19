import { Grid, styled, Box } from "@mui/material";
import { ChatList } from "widgets/chat-list";
import { Sidebar } from "shared/ui/Sidebar";
import { useParams } from "react-router";
import { ChatIDContext } from "shared/providers/ChatContext";
import { ChatHeader } from "widgets/actual-chat/header";
import { ChatMessages } from "widgets/actual-chat/messages";
import { CreateMessage } from "widgets/actual-chat/create-message";
import { useMsgQueue } from "features/send-message/model";

// styled
const GridContainer = styled(Grid)({
	height: '100dvh'
})
const ChatContainer = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	height: '100%'
})
const Header = styled(ChatHeader)({
	flexGrow: 0,
	flexShrink: 1
})
const Messages = styled(ChatMessages)({
	flexGrow: 1
})
const CreateMsgFooter = styled(CreateMessage)({
	flexGrow: 0,
	flexShrink: 1
})

export const ChatPage = () => {
	const { chatID } = useParams<'chatID'>()

	const msgQueue = useMsgQueue(chatID)

	return (
		<ChatIDContext chatID={chatID}>
			<GridContainer container>

				<Grid item xs={4}
					component={Sidebar}
					title="Chats"
					withNavigation={true}
					body={<ChatList />}
				/>

				<Grid item xs={7} component={ChatContainer}>
					{!chatID &&
						<h1>nothing</h1>
					}
					{chatID && msgQueue && <>
						<Header chatID={chatID} />
						<Messages
							chatID={chatID}
							msgQueue={msgQueue.state}
						/>
						<CreateMsgFooter
							chatID={chatID}
							sendMsg={msgQueue.addMessage}
						/>
					</>
					}
				</Grid>
			</GridContainer >
		</ChatIDContext>
	)
}