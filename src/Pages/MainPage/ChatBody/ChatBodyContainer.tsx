import React, { useContext } from 'react';
import { ControllerContext } from '../../../Helpers/context';
import ChatBodyView from './ChatBodyView';

const ChatBodyContainer = () => {
	const controller = useContext(ControllerContext)
	return (
		<ChatBodyView
			messages={controller.chatStore.getMessages}
			userID={controller.userStore.getUser.id}
		/>
	);
};

export default ChatBodyContainer;