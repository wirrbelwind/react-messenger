import { Box, Drawer, IconButton, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowButton } from "shared/ui/ArrowButton";
import { BurgerButton } from "shared/ui/BurgerButton";
import { BurgerNavigation } from "widgets/burger-navigation";

interface Props {
	title?: string
	withSearch?: boolean
	withBackButton?: boolean
	withNavigation?: boolean
	body?: React.ReactNode
}
export const Sidebar = React.memo(({ title, withSearch, withBackButton, body, withNavigation }: Props) => {
	const history = useNavigate()

	return (
		<Box>
			{
				withNavigation &&
				<BurgerNavigation />
			}
			{
				withBackButton &&
				<ArrowButton direction="left" onClick={() => history(-1)} />
			}
			{
				title && <Typography >{title}</Typography>
			}
			{
				withSearch && <Input type='text' placeholder="Search" fullWidth />
			}
			{
				body
			}

		</Box>)

})