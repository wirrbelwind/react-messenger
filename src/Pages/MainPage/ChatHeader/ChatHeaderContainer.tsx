import React, { useContext, useEffect } from 'react';
import ButtonView from '../../../Components/Button/ButtonView';
import { ControllerContext } from '../../../Helpers/context';
import ChatPanelView from '../ChatPanel/ChatPanelView';
import ChatTileContainer from '../ChatTile/ChatTileContainer';
import ChatTileView from '../ChatTile/ChatTileView';

const ChatHeaderContainer = () => {
	return (
		<div>
			<ChatTileContainer />
			
			<ChatPanelView>
				<ButtonView></ButtonView>
			</ChatPanelView>
		</div>
	);
};

export default ChatHeaderContainer;