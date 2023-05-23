import { Typography } from "@mui/material"

interface TitleProps {
	children: string
}

export const Title = (props: TitleProps) => {
	const { children } = props

	return (
		<Typography
			textAlign='center'
			variant="h3"
		>
			{children}
		</Typography>
	)
}