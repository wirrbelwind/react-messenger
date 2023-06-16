import { Controller, UseFormWatch } from "react-hook-form"
import { TextField } from "@mui/material"
import pwdConfig from './config/password.config'
import { IAuthFieldInputProps } from "./IAuthFieldInputProps"
import { IAuthFields } from "./IAuthFields"

interface InputConfirmPasswordProps extends IAuthFieldInputProps {
	watch: UseFormWatch<IAuthFields>
}

export const InputConfirmPassword = (props: InputConfirmPasswordProps) => {
	const { controller, watch } = props

	return (
		<Controller
			rules={{
				...pwdConfig.rules,
				validate: (confirmPwd) => {
					if (confirmPwd !== watch('pwd')) return 'Passwords don\'t match'
				}
			}}

			name="confirmPwd"
			control={controller}

			render={({ field }) => (
				<TextField {...field} label='Confirm password' variant='filled' />
			)}
		/>
	)
}
