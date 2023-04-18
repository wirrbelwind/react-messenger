import { ExtendButtonBase, IconButton, IconButtonProps, IconButtonTypeMap } from "@mui/material"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { FC } from "react";

export const BurgerButton:FC<IconButtonProps> = (props) => {
	return (
		<IconButton aria-label="burger-btn" {...props}>
			<MenuRoundedIcon />
		</IconButton>
	)
}