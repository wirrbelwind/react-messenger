import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IconButton, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const SidebarHeader = () => {
	const [toggleState, setToggleState] = React.useState(false);

	const toggleDrawer = () => {
		setToggleState(prev => !prev);
	};

	return (
		<>
			<IconButton >
				<MenuRoundedIcon />
			</IconButton>
			<Button onClick={() => toggleDrawer()}>{'button'}</Button>
			<Drawer
				anchor={'left'}
				open={toggleState}
				onClose={() => toggleDrawer()}
			>
				<Typography component='h1'>asdsadasdada</Typography>
			</Drawer>
		</>
	);
};

export default SidebarHeader;