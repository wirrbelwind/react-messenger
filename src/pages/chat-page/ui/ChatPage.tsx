import { Grid } from "@mui/material";
import { ChatList } from "widgets/chat-list";
import { Sidebar } from "shared/ui/Sidebar";
import { useParams } from "react-router";
import { ChatIDContext } from "shared/providers/ChatContext";
import { useMsgQueue } from "features/send-message/model";
import { ChatContainer, CreateMsgFooter, GridContainer, Header, Messages } from "./styled";
import { NotChatAlert } from "./NotChatAlert";

export const ChatPage = () => {
	const { chatID } = useParams<'chatID'>()

	const msgQueue = useMsgQueue(chatID)

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