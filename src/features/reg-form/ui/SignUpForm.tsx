import { Alert, Button, LinearProgress, Paper, Typography } from "@mui/material"
import { useSignupFormSteps } from "../model"
import { useNavigate } from "react-router"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { authModule } from "shared/firebase"
import { useEffect, useState } from "react"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import { AuthErrorCodes } from "firebase/auth"
import { formatAuthError } from "../lib"

export const SignUpForm = () => {
	const navigate = useNavigate()
	const steps = useSignupFormSteps()
	const { fields } = steps

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		// create user and go to index page, if user choose fast signup and submits email and pwd
		if (steps.currentStepIndex === 0) {
			createUserWithEmailAndPassword(fields.email, fields.pwd)
		}
	}

	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		error,
	] = useCreateUserWithEmailAndPassword(authModule)

	if (fields._fastSignup && user) {
		console.log('navigate');
		navigate('/', { replace: true })
	}

	let submitBtnTxt = '>'
	if (steps.isFirstStep) submitBtnTxt = 'Create'
	if (!steps.isFirstStep && !steps.isLastStep) submitBtnTxt = 'Next'
	if (steps.isLastStep) submitBtnTxt = 'Finish'


	useEffect(() => {
		if (!error) return;

		const errorTxt = formatAuthError(error)
		const isErrExists = !!fields._errors.find(el => el === errorTxt)

		if (!isErrExists) {
			steps.updateFields({ _errors: [...fields._errors, errorTxt] })
		}
	}, [error])

	return (
		<Paper
			component='form'
			onSubmit={onSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				padding: '10px 20px'
			}}
		>
			<Typography
				textAlign='center'
				variant="h3">
				Sign Up
			</Typography>

			{/* Errors */
				fields._errors.length > 0 &&
				<Alert severity="error">{fields._errors.join('\n')}</Alert>
			}


			{steps.step}

			{/* allow user to go back unless ability to back to first step with creating account */}
			{steps.currentStepIndex > 1 &&
				<Button onClick={steps.back}>Back</Button>
			}

			<Button
				type='submit'
				variant="contained"
				disabled={!fields.email || !fields.pwd}
			>
				{submitBtnTxt}
			</Button>
		</Paper>
	)
}