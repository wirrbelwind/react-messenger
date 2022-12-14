import React, { FC } from 'react';
import ChatItem from '../../ChatItem/ChatItemView';

interface SidebarBodyProps {
	items: React.ReactNode[]
}
const SidebarBodyView: FC<SidebarBodyProps> = ({ items }) => {

	return (
		<div>
			{...items}
		</div>
	);
};

export default SidebarBodyView;