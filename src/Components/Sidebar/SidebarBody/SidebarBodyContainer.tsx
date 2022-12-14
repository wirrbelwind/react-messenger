import React, { useContext } from 'react';
import { ControllerContext } from '../../../Helpers/context';
import ChatItemView from '../../ChatItem/ChatItemView';
import SidebarBodyView from './SidebarBodyView';

const SidebarBodyContainer = () => {
	const controller = useContext(ControllerContext)
	const items = controller.chatListStore.getList.map(item => <ChatItemView chat={item}/>)
	return (
		<SidebarBodyView items={items}/>
	);
};

export default SidebarBodyContainer;