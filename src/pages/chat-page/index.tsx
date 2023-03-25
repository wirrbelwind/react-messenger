import { Box, Button, Grid } from "@mui/material";
import { Sidebar } from "widgets/sidebar";
import { ChatList } from "widgets/chat-list";
import { useParams } from "react-router";
import React from "react";
import { ChatHeader } from "widgets/actual-chat/header/ui";
import { ChatMessages } from "widgets/actual-chat/messages/ui";
import { CreateMessage } from "widgets/actual-chat/create-message/ui";
import { userModel } from "entities/user";
import { ResizableBox } from 'react-resizable';

const MemoizedSidebar = React.memo(Sidebar)

export const ChatPage = () => {
	const { chatID } = useParams<'chatID'>()

	const logout = userModel.logout()

	return (
		<Grid container sx={{ height: '100dvh' }}>

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
					<Box sx={{
						display: 'flex',
						flexDirection: 'column',
						height: '100%'
					}}>
						<Box sx={{ flexGrow: 0, flexShrink: 1 }}><ChatHeader chatID={chatID} /></Box>
						<Box sx={{flexGrow: 1}} ><ChatMessages chatID={chatID} /></Box>
						<Box sx={{ flexGrow: 0, flexShrink: 1 }}><CreateMessage chatID={chatID} /></Box>
					</Box>
				}
				{!chatID && 'nothing'}
			</Grid>

		</Grid >
	)
}