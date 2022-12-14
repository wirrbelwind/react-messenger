import React, { FC } from 'react';
import { IMessage } from '../../Interfaces/IMessage'
import MessageView from '../Message/MessageView';
import classes from './MessageList.module.scss'

interface MessageListViewProps {
	messages: IMessage[]
}
const MessageListView: FC<MessageListViewProps> = ({ messages }) => {
	return (
		<div className={classes.container}>
			{messages.map( msg => <MessageView msg={msg} isMine={true}/>)}
		</div>
	);
};

export default MessageListView;