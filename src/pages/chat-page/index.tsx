import { Button, Grid } from "@mui/material";
import { Sidebar } from "widgets/sidebar";
import { ChatList } from "widgets/chat-list";
import { useParams } from "react-router";
import React from "react";
import { ChatHeader } from "widgets/actual-chat/header/ui";
import { ChatMessages } from "widgets/actual-chat/messages/ui";
import { CreateMessage } from "widgets/actual-chat/create-message/ui";
import { userModel } from "entities/user";

const MemoizedSidebar = React.memo(Sidebar)

export const ChatPage = () => {
	const { chatID } = useParams<'chatID'>()

	const logout = userModel.logout()

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
				<Button onClick={() => logout.mutate()}>LOGOUT</Button>

				{chatID &&
					<>
						<ChatHeader chatID={chatID} />
						<ChatMessages chatID={chatID} />
						<CreateMessage chatID={chatID} />
					</>
				}
				{!chatID && 'nothing'}
			</Grid>

		</Grid >
	)
}