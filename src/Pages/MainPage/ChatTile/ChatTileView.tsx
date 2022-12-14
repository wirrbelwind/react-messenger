import React, { FC, MouseEventHandler } from 'react';
import AvatarView from '../../../Components/Avatar/AvatarView';
import { IDMChat, IGroupChat } from '../../../Interfaces/IChat';
interface ChatTileViewProps {
	chat: IDMChat | IGroupChat
	partyCount__Group?: number
	partyIsOnline__Group?: number
	userOnlineStatus__DM?: boolean | string
	onClick?: MouseEventHandler<HTMLButtonElement>
}

const ChatTileView: FC<ChatTileViewProps> = (props) => {
	return (
		<button onClick={props.onClick}>
			<AvatarView url={props.chat.avatar} title={props.chat.name} />
			{props.chat.name}
			{props.chat.type === 'dm' && props.userOnlineStatus__DM}

			{props.chat.type === 'group' && props.partyCount__Group}
			{props.chat.type === 'group' && props.partyIsOnline__Group}
		</button>
	);
};

export default ChatTileView;