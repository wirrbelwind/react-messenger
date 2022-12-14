import React from 'react';
import ChatBodyContainer from '../ChatBody/ChatBodyContainer';
import ChatHeaderContainer from '../ChatHeader/ChatHeaderContainer';

const ChatView = () => {
	return (
		<div>
			<ChatHeaderContainer/>
			<ChatBodyContainer/>
		</div>
	);
};

export default ChatView;