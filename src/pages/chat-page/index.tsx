import { Grid, styled } from "@mui/material";
import { ChatList } from "widgets/chat-list";
import { Chat } from "widgets/actual-chat/chat-container";
import { Sidebar } from "shared/ui/Sidebar";
import { useParams } from "react-router";
import { ChatIDContext } from "shared/libs/providers/ChatContext";

// styled
const GridContainer = styled(Grid)({
	height: '100dvh'
})

export const ChatPage = () => {
	const { chatID } = useParams<'chatID'>()

	return (
		<ChatIDContext chatID={chatID}>
			<GridContainer container>

				<Grid item xs={4}
					component={Sidebar}
					title="Chats"
					withNavigation={true}
					body={<ChatList />}
				/>

				<Grid item xs={7} component={Chat} />

			</GridContainer >
		</ChatIDContext>
	)
}