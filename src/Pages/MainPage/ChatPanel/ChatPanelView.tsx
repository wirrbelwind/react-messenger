import React, { FC } from 'react';
interface ChatPanelViewProps {

}
const ChatPanelView: React.FC<ChatPanelViewProps> = () => {
	
	return (
		<div>
			{
				items.map(btnProps => {
					return (
						<button {...btnProps}>
							{
								btnProps.imgURL ? <img src={btnProps.imgURL} alt="" /> : btnProps.text
							}
						</button>)
				})
			}
		</div>
	);
};

export default ChatPanelView;