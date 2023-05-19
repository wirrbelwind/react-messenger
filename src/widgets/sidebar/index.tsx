import { Box, Drawer, IconButton, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BurgerNavigation } from "widgets/burger-navigation";

interface Props {
	title?: string
	body?: React.ReactNode
}
export const SidebarWidget = React.memo(({ title, withSearch, body, withNavigation }: Props) => {
	const history = useNavigate()

	return (
		<Box>
			<BurgerNavigation />
			{title && <Typography >{title}</Typography>}
			<Input type='text' placeholder="Search" fullWidth />
			
			{
				body
			}

		</Box>)

})