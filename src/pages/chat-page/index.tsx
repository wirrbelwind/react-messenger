import { Grid, Typography } from "@mui/material";
import { ChatBar, chatListModel } from "entities/chat-list";
import { userModel } from "entities/user";
import { Sidebar } from "widgets/sidebar";
import axios from 'axios'

export const ChatPage = () => {
	const chatList = chatListModel.useList()

	if (chatList.isSuccess) console.log(chatList.data);
	if (chatList.isError) console.log(chatList.error);
	if (chatList.isLoading) console.log('loading');

	return (
		<Grid container>

			<Grid item xs={3}>
				{/* <Sidebar
					title="Chats"
					withBurger={true}
					withBackButton={true}
					withSearch={true}
					body={chatList}
				/> */}
				{chatList.isError && <h1>error</h1>}
				{chatList.isLoading && <h1>loading</h1>}

				{/* {chatList.isSuccess &&
					chatList.data.map(chat => <ChatBar />)
				} */}
			</Grid>

			<Grid item xs={7}>
				chat
			</Grid>

		</Grid>
	);
};