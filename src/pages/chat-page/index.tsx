import { Grid, styled } from "@mui/material";
import { ChatList } from "widgets/chat-list";
import React from "react";
import { Chat } from "widgets/actual-chat/chat-container";
import { Sidebar } from "shared/ui/Sidebar";

// styled
const GridContainer = styled(Grid)({
	height: '100dvh'
})


export const ChatPage = () => {

	return (
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
				component={Chat}
			/>

		</GridContainer >
	)
}