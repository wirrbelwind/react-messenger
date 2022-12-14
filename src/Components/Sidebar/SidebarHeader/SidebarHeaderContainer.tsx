import React, { FC, useContext } from 'react';
import { ControllerContext } from '../../../Helpers/context';
import SidebarHeaderView from './SidebarHeaderView';

const SidebarHeaderContainer: FC = () => {
	const controller = useContext(ControllerContext)
	const title = controller.appStore.getSidebarContent
	const searchState = {
		value: controller.chatListStore.getQuery,
		setState: controller.chatListStore.setQuery
	}

	return (
		<SidebarHeaderView
			title={title}
			searchState={searchState}
		/>
	);
};

export default SidebarHeaderContainer;