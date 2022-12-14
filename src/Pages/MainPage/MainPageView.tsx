import React from 'react';
import Columns from '../../Components/Columns/Columns';
import Resizer from '../../Components/Resizer/Resizer';
import Sidebar from '../../Components/Sidebar/SidebarView';

const MainPageView = () => {
	return (
		<Columns cols={ [ <Sidebar/> , <Resizer/> ,  ]}/>
	);
};

export default MainPageView;