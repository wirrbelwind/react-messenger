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

	const steps = useSignupFormSteps()
	const { fields } = steps

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()

		await steps.handleStepTransition('next')
	}

	return (
		<Paper
			component='form'
			onSubmit={handleSubmit}
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
				steps.authError &&
				<Alert severity="error">{formatAuthError(steps.authError)}</Alert>
			}

			{steps.step}

			{/* allow user to go back unless ability to back to first step with creating account */}
			{steps.backIsPossible() &&
				<Button
					onClick={async () => await steps.handleStepTransition('back')}
				>
					Back
				</Button>
			}

			<Button
				type='submit'
				variant="contained"
				disabled={!steps.nextIsPossible()}
			>
				{steps.submitBtnTxt()}
			</Button>
		</Paper>
	)
}