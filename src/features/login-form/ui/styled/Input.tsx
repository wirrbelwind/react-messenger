import { TextField, TextFieldProps } from "@mui/material"

// interface InputProps extends TextFieldProps {

// }

export const Input = (props: TextFieldProps) => {
	return (
		<TextField
			fullWidth
			{...props}
		/>
	)
}