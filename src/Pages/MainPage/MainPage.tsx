import React, { useContext } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Button } from '@mui/material';
import { ControllerContext } from '../../Helpers/initStores';
import { useNavigate } from 'react-router';
import Sidebar from '../../GeneralComponents/Sidebar/Sidebar';

const MainPage = () => {
	const controller = useContext(ControllerContext)
	const history = useNavigate()
	
	return (
		<Grid2 container>
			<Grid2> <Sidebar/> </Grid2>
		</Grid2>
		// <Columns cols={ [ <SidebarView/> , <Resizer/> , <ChatView/> ]}/>
	);
};

export default MainPage;