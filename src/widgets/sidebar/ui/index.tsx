import { Box, Button, Drawer, IconButton, Input, TextField, Typography } from "@mui/material";
import PathRoutes from "pages/routeConfig";
import { actualChatModel } from "entities/actual-chat/chat";
import { chatListModel } from "entities/chat-list";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowButton } from "shared/ui/ArrowButton";
import { BurgerButton } from "shared/ui/BurgerButton";

interface Props {
	title?: string
	withSearch?: boolean
	withBurger?: boolean
	withBackButton?: boolean
	body?: React.ReactNode
}
export const Sidebar = ({ title, withSearch, withBurger, withBackButton, body }: Props) => {
	const history = useNavigate()

	// burger menu state
	const [burgerMenu, setBurgerMenu] = useState<boolean>(false)
	const toggleBurgerMenu = () => setBurgerMenu(prev => !prev)


	return (

		<Box>
			{
				withBurger && <>
					<BurgerButton onClick={() => toggleBurgerMenu()} />
					<Drawer
						anchor='left'
						open={burgerMenu}
						onClose={() => toggleBurgerMenu()}
					>
						<Typography component='h1'>asdsadasdada</Typography>
					</Drawer>
				</>
			}
			{
				withBackButton &&
				<ArrowButton direction="left" onClick={() => history(-1)} />
			}
			{
				title && <Typography>{title}</Typography>
			}
			{
				withSearch && <Input type='text' placeholder="Search" />
			}
			{
				body
			}

		</Box>)

}