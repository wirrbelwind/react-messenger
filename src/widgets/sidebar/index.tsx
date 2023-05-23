import { Box, Drawer, IconButton, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BurgerNavigation } from "widgets/burger-navigation";

interface SidebarWidgetProps {
	title?: string
	body?: React.ReactNode
}
export const SidebarWidget = React.memo((props: SidebarWidgetProps) => {
	const { title, body } = props

	return (
		<Box border='1px solid'>
			<BurgerNavigation />
			{title && <Typography >{title}</Typography>}

			{
				body
			}

		</Box>)

})