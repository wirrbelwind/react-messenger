import { Box, Drawer, IconButton, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BurgerNavigation } from "features/burger-navigation";
import { LogoIcon } from "shared/ui/LogoIcon";

interface SidebarWidgetProps { title?: string; body?: React.ReactNode }
export const SidebarWidget = React.memo((props: SidebarWidgetProps) => {
	const { title, body } = props
	return (<Box border='1px solid'>
		<BurgerNavigation />

		{/* <LogoIcon width={50} /> */}

		{title && <Typography >{title}</Typography>}

		{body}
	</Box>)
})