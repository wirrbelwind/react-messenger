import { Paper } from "@mui/material"

interface AuthFormContainerProps {
	children: React.ReactNode
}

export const AuthFormContainer = (props: AuthFormContainerProps) => {
	const { children } = props

	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				background: 'white',
				padding: '20px',
				borderRadius: '5px',
				width: '500px'
			}}
		>
			{children}
		</Paper>
	)
}