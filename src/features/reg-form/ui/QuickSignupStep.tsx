import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material"
import { FC, useEffect } from "react"
import useInput from "shared/libs/hooks/useInput"
import { StepProps } from "../lib"

export const QuickSignupStep: FC<StepProps> = ({ email, pwd, _fastSignup, _errors, updateFields }) => {
	const confirmPwd = useInput<string>('')

	useEffect(() => {
		console.log('CHANGE');

		if (pwd && confirmPwd.value && pwd !== confirmPwd.value)
			updateFields({ _errors: [..._errors, 'Пароли не совпадают'] })

	}, [pwd, confirmPwd.value])

	return (
		<>
			<TextField
				variant="filled"
				value={email}
				onChange={e => updateFields({ email: e.currentTarget.value })}
				type='email'
				label='Email'
				required
			/>
			<TextField
				variant="filled"
				value={pwd}
				onChange={e => updateFields({ pwd: e.currentTarget.value })}
				type='password'
				label='Password'
				required
			/>
			<TextField
				variant="filled"
				value={confirmPwd.value}
				onChange={confirmPwd.onChange}
				type='password'
				label='Confirm password'
				required
			/>
			<FormGroup>
				<FormControlLabel
					color="primary"
					label="Fast"
					control={
						<Switch
							color="primary"
							checked={_fastSignup}
							onChange={e => updateFields({ _fastSignup: e.currentTarget.checked })}
						/>
					}
				/>
			</FormGroup>
		</>
	)
}