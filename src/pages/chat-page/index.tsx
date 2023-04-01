import { Box, Button, Grid } from "@mui/material";
import { ChatList } from "widgets/chat-list";
import { useParams } from "react-router";
import React from "react";
import { ChatHeader } from "widgets/actual-chat/header/ui";
import { ChatMessages } from "widgets/actual-chat/messages/ui";
import { CreateMessage } from "widgets/actual-chat/create-message/ui";
import { userModel } from "entities/user";
import { ResizableBox } from 'react-resizable';
import { Chat } from "widgets/actual-chat/chat-container";
import { Sidebar } from "shared/ui/Sidebar";

const MemoizedSidebar = React.memo(Sidebar)

export const ChatPage = () => {


	return (
		<Grid container sx={{ height: '100dvh' }} >

			<Grid item xs={4}>
				<MemoizedSidebar
					title="Chats"
					withBurger={true}
					body={<ChatList />}
				/>
			</Grid>

			<Grid item xs={7}>
				<Chat />
			</Grid>

		</Grid >
	)
}