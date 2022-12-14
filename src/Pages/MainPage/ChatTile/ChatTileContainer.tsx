import React, { useContext } from 'react';
import { ControllerContext } from '../../../Helpers/context';
import ChatTileView from './ChatTileView';

const ChatTileContainer = () => {
	const controller = useContext(ControllerContext)
	const chat = controller.chatStore.getChat
	const party = controller.chatStore.getParty

	return (
		<ChatTileView
			chat={chat}
			onClick={() => { }}
			userOnlineStatus__DM={party[0].isOnline ? 'online' : party[0].onlineTime}
		/>
	);
};

export default ChatTileContainer;