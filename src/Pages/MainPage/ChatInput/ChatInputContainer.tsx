import React, { useContext } from 'react';
import AttachmentInputView from '../../../Components/AttachmentInput/AttachmentInputView';
import ButtonView from '../../../Components/Button/ButtonView';
import InputView from '../../../Components/Input/Input';
import { ControllerContext } from '../../../Helpers/context';

const ChatInputContainer = () => {
	const controller = useContext(ControllerContext)
	return (
		<div>
			<AttachmentInputView
				onChange={() => { }} // доделать добавление файла в память
				iconURL='./assets/attach.svg'
			/>

			<InputView
				value={controller.actualMessageStore.getText}
				onChange={(e) => { controller.actualMessageStore.setText(e.currentTarget.value) }}
			/>

			{/* send message button */}
			<ButtonView onChange={() => { controller.sendMessage() }}>
				<img src="" alt="" />
			</ButtonView>

			{/* emoji */}
			<ButtonView onChange={() => { }}>
				<img src="" alt="" />
			</ButtonView>
		</div>
	);
};

export default ChatInputContainer;