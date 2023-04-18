import { IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { Link } from "react-router-dom"
import SettingsIcon from '@mui/icons-material/Settings';
import { navs } from "./navigation-list";

export const BurgerNavigation = () => {
	const [open, setOpen] = useState(false)
	const toggleMenu = () => setOpen(prev => !prev)

	return (<>

		<IconButton
			size="large"
			onClick={toggleMenu}>
			<MenuIcon />
		</IconButton>

		<SwipeableDrawer
			anchor="left"
			open={open}
			onOpen={toggleMenu}
			onClose={toggleMenu}
		>
			{
				navs.map(nav => <ListItem key={nav.to} component={Link} to={nav.to}>
					<ListItemIcon> <nav.icon /> </ListItemIcon>
					<ListItemText> {nav.label} </ListItemText>
				</ListItem>)
			}

		</SwipeableDrawer>

	</>)
}