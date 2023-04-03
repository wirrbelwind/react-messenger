import { Alert, Paper, Typography } from "@mui/material"
import { useSignupFormSteps } from "../model"
import { useNavigate } from "react-router"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { authModule } from "shared/firebase"
import { useState } from "react"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';

const SignUpForm = () => {
	const navigate = useNavigate()
	const steps = useSignupFormSteps()
	const { fields } = steps

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		// create user and go to index page, if user choose fast signup and submits email and pwd
		if (steps.currentStepIndex === 0 && fields._fastSignup) {
			await createUserWithEmailAndPassword(fields.email, fields.pwd)
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
			<Typography textAlign='center' variant="h3">Sign Up</Typography>

			{steps.step}

			<LoadingButton
				type='submit'
				loading={loading}
				loadingPosition="end"
				endIcon={<SaveIcon />}
				variant="outlined"
				disabled={!fields.email || !fields.pwd}
			>
				{
					(!loading && !error && !user) ? 'Submit' : 'Loading'
				}
			</LoadingButton>
		</Paper>
	)
}