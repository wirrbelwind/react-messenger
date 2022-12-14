import React, { FC } from 'react';
import { IMessage } from '../../Interfaces/IMessage';
import classes from './Message.module.scss'

interface MessageProps {
	msg: IMessage
	isMine: boolean
}
const MessageView: FC<MessageProps> = ({ msg, isMine }) => {
	const styles = [classes.container, isMine ? classes.isMine : ''].join(' ')
	return (
		<div className={styles}>
			{msg.text_content}
			{msg.send_date}
		</div>
	);
};
interface MessageProps {
	msg: IMessage
}
export default MessageView;