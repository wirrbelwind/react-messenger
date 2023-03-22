import { Grid } from "@mui/material";
import { Sidebar } from "widgets/sidebar";
import { ChatList } from "widgets/chat-list";
import { useParams } from "react-router";
import React from "react";
import { ChatHeader } from "widgets/chat-header/ui";
import { ChatMessages } from "widgets/chat-messages/ui";

const MemoizedSidebar = React.memo(Sidebar)

export const ChatPage = () => {
	const { chatID } = useParams<'chatID'>()

	return (
		<Grid container>

			<Grid item xs={4}>
				<MemoizedSidebar
					title="Chats"
					withBurger={true}
					withBackButton={false}
					withSearch={false}
					body={<ChatList />}
				/>

			</Grid>

			<Grid item xs={7}>
				{chatID &&
					<>
						<ChatHeader chatID={chatID} />
						<ChatMessages chatID={chatID} />
					</>
				}
				{!chatID && 'nothing'}
			</Grid>

		</Grid >
	)
}