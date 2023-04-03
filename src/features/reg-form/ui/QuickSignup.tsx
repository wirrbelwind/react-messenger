import { LoadingButton } from "@mui/lab"
import { Alert, Checkbox, FormControlLabel, FormGroup, Paper, Switch, TextField, Typography } from "@mui/material"
import { FC, useState } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { authModule } from "shared/firebase"
import useInput from "shared/libs/hooks/useInput"
import { wait } from "shared/libs/wait"
import routeConfig from "shared/consts/routeConfig"
import { StepProps } from "../lib"

export const QuickSignup: FC<StepProps> = ({ email, pwd, _fastSignup, updateFields }) => {


	const confirmPwd = useInput<string>('')

	

	return (
		<>
			<TextField
				value={email}
				onChange={e => updateFields({ email: e.currentTarget.value })}
				type='email'
				label='Email'
				required
			/>
			<TextField
				value={pwd}
				onChange={e => updateFields({ pwd: e.currentTarget.value })}
				type='password'
				label='Password'
				required
			/>
			<TextField
				value={confirmPwd.value}
				onChange={confirmPwd.onChange}
				type='password'
				label='Confirm password'
				required
			/>
			<FormGroup>
				<FormControlLabel
					label="Fast"
					control={
						<Switch
							checked={_fastSignup}
							onChange={e => updateFields({ _fastSignup: e.currentTarget.checked })}
							/>
					}
				/>
			</FormGroup>

			
		</>
	)
}