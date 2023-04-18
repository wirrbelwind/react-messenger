import { ListItem, ListItemProps, styled, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";

export const Container = styled(ListItem)(({ theme }) => ({
	':hover': { backgroundColor: theme.palette.background.paper }
}))

interface ITextComponent {
	children: string
}

export const ChatName: FC<ITextComponent> = ({ children }) => {
	return (
		<Typography variant="body1" color='primary.dark'>
			{children}
		</Typography>)

}

export const LastMsg: FC<ITextComponent> = ({ children }) => {
	return (
		<Typography variant="body2" color='primary'>
			{children}
		</Typography>)

}
export const DateText: FC<ITextComponent> = ({ children }) => {
	return (
		<Typography variant='body2' color='primary.dark'>
			{children}
		</Typography>)

}
export const StatusText: FC<ITextComponent> = ({ children }) => {
	return (
		<Typography variant='body2' color='primary.light'>
			{children}
		</Typography>)

}
// variant='body2' color='primary.dark'