import { Controller } from "react-hook-form"
import { TextField } from "@mui/material"
import pwdConfig from './config/password.config'
import { IAuthFieldInputProps } from "./IAuthFieldInputProps"

export const InputPassword = (props: IAuthFieldInputProps) => {
	const { controller} = props

	return (
		<Controller
			rules={pwdConfig.rules}
			name="pwd"
			control={controller}
			render={({ field }) => <TextField {...field} label={pwdConfig.label} variant='filled' />}
		/>
	)
}
