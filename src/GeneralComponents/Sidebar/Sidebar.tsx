import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { ControllerContext } from '../../Helpers/initStores';
import Zxc from './SidebarHeader';

const Sidebar = () => {
	const controller = useContext(ControllerContext)

	return (
		<Box>
			<Box> {/* header of sidebar, contains toggle button, content-text-state and search input */}

				<Zxc />
			</Box>

			<Box> {/* Body of sidebar. Contains a list of chats/settings   */}

			</Box>
		</Box>
	);
};

export default Sidebar;