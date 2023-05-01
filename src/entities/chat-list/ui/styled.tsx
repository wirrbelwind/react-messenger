import { ListItem, styled, Typography } from "@mui/material";

export const Container = styled(ListItem)(({ theme }) => ({
	':hover': { backgroundColor: theme.palette.background.paper }
}))

interface ITextComponent {
	children: string
}

export const ChatName = ({ children }: ITextComponent) => {
	return (
		<Typography variant="body1" color='primary.dark'>
			{children}
		</Typography>
	)
}

export const LastMsg = ({ children }: ITextComponent) => {
	return (
		<Typography variant="body2" color='primary'>
			{children}
		</Typography>
	)
}
export const DateText = ({ children }: ITextComponent) => {
	return (
		<Typography variant='body2' color='primary.dark'>
			{children}
		</Typography>
	)
}
export const StatusText = ({ children }: ITextComponent) => {
	return (
		<Typography variant='body2' color='primary.light'>
			{children}
		</Typography>
	)
}
