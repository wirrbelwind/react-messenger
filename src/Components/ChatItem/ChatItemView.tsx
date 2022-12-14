import React, { FC, useContext } from 'react';
import { ControllerContext } from '../../Helpers/context';
import { IDMChat, IGroupChat } from '../../Interfaces/IChat';
import AvatarView from '../Avatar/AvatarView';
interface ChatItemProps {
	chat: IGroupChat | IDMChat
}
const ChatItemView: FC<ChatItemProps> = ({ chat }) => {
	const controller = useContext(ControllerContext)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		controller.openChat(chat)
	}

	return (
		<button>
			CHAT TILE OF CHAT {chat.id}
		</button>
	)
};

export default ChatItemView;