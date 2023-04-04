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

		// if user on 1 step with email & pwd
		if (steps.currentStepIndex === 0) {
			createUserWithEmailAndPassword(fields.email, fields.pwd) // create user
			if (fields._fastSignup) navigate('/', { replace: true }) // if fast signup, then go to index page
		}

		if (!steps.isFirstStep && !steps.isLastStep) steps.next()

		//go to index page if step is last
		if (steps.isLastStep) navigate('/', { replace: true })
	}
	
	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		error,
	] = useCreateUserWithEmailAndPassword(authModule)

	//go next if step isn't last
	if (steps.isFirstStep && !error && user && !loading) steps.next()

	if (fields._fastSignup && user) {
		console.log('navigate');
		navigate('/', { replace: true })
	}

	let submitBtnTxt = '>'
	if (steps.isFirstStep) submitBtnTxt = 'Create'
	if (!steps.isFirstStep && !steps.isLastStep) submitBtnTxt = 'Next'
	if (steps.isLastStep) submitBtnTxt = 'Finish'
	return (
		<Paper
			component='form'
			onSubmit={onSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				padding: '10px 50px'
			}}
		>


			<Typography
				textAlign='center'
				variant="h3">
				Sign Up
			</Typography>

			{/* errors */
				error &&
				<Alert severity="error">{formatAuthError(error)}</Alert>
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