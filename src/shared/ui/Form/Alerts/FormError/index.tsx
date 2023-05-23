import { Alert } from "@mui/material"
import { IFormAlert } from "../IFormAlert"


export const FormError = (props: IFormAlert) => {
	const { children } = props

	return (
		<Alert severity="error"
			sx={{
				paddingY: 0,
				paddingX: 1
			}}
			// icon={}
		>
			{children}
		</Alert>
	)
}