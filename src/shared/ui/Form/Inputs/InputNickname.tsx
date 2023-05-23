import { Controller } from "react-hook-form"
import { TextField } from "@mui/material"
import nicknameConfig from './config/nickname.config'
import { IAuthFieldInputProps } from "./IAuthFieldInputProps"

export const InputNickname = (props: IAuthFieldInputProps) => {
	const { controller } = props

	return (
		<Controller
			control={controller}
			rules={nicknameConfig.rules}
			name="name"

			render={({ field }) => <TextField {...field} label={nicknameConfig.label}
				variant='filled' />}
		/>
	)
}