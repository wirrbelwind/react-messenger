import React, { FC, useContext } from 'react';
import MessageView from '../../../Components/Message/MessageView';
import { ControllerContext } from '../../../Helpers/context';
import { IMessage } from '../../../Interfaces/IMessage';
interface ChatBodyViewProps {
	messages: IMessage[]
	userID: number
}
const ChatBodyView: FC<ChatBodyViewProps> = ({ messages, userID }) => {
	return (
		<div>
			{
				messages.map(msg => <MessageView msg={msg} isMine={msg.client_id === userID} />)
			}
		</div>
	);
};

export default ChatBodyView;