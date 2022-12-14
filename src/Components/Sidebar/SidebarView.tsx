import React from 'react';
import SidebarBodyContainer from './SidebarBody/SidebarBodyContainer';
import SidebarHeaderContainer from './SidebarHeader/SidebarHeaderContainer';

const SidebarView = () => {
	return (
		<div>
			<SidebarHeaderContainer />
			<SidebarBodyContainer/>
		</div>
	);
};

export default SidebarView;