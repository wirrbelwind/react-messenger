import { Box } from '@mui/material'
import logoURL from './logo.png'

interface LogoIconProps {
	width: number
	height?: number
}

export const LogoIcon = (props: LogoIconProps = { width: 100 }) => {
	return (
	// <Box width={props.width} height={props.height ?? props.width}>
		<img {...props} src={logoURL} />
	// </Box>}
	)
}