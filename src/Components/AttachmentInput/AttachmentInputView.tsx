import React, { FC } from 'react';
import classes from './AttachmentInput.module.scss'
interface AttachmentInputViewProps {
	iconURL: string
}
const AttachmentInputView: FC<AttachmentInputViewProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ iconURL, ...rest }) => {
	return (
		<input
			type='file'
			style={{ backgroundImage: iconURL }}
			className={classes.container}
			{...rest}
		/>
	);
};

export default AttachmentInputView;