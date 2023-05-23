import { Controller } from "react-hook-form"
import { TextField } from "@mui/material"
import emailConfig from './config/email.config'
import { IAuthFieldInputProps } from "./IAuthFieldInputProps"


export const InputEmail = (props: IAuthFieldInputProps) => {
	const { controller } = props

	return (
		<Controller
			rules={emailConfig.rules}
			name="email"
			control={controller}
			render={({ field }) => <TextField {...field} label={emailConfig.label} variant='filled' />}
		/>
	)
}