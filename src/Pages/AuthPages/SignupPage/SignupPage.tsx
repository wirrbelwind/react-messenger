import { Alert, Box, Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, StepLabel, Typography } from '@mui/material';
import React, { FormEvent, useContext, useState } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink, Route, Routes, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import { useMultistepForm } from '../../../Hooks/useMultistepForm';
import AuthContainer from '../UI/AuthContainer';
import AuthForm from '../UI/AuthForm';
import SignupStep4 from './SignupStep4';
import { ControllerContext } from '../../../Helpers/initStores';
import { signupForm } from '../../../Models/SignupData';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import SignupStep3 from './SignupStep3';

const SignupPage = () => {
	const [formState, setFormState] = useState<signupForm>({
		nickname: '',
		email: '',
		password: '',
		about: ''
	})
	function updateFields(fields: Partial<signupForm>) {
		setFormState(prev => { return { ...prev, ...fields } })
	}
	// hook for several steps of signup
	const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
		useMultistepForm([
			<SignupStep1 {...formState} updateFields={updateFields} />,
			<SignupStep2 {...formState} updateFields={updateFields} />,
			<SignupStep3 {...formState} updateFields={updateFields} />,
			<SignupStep4 {...formState} updateFields={updateFields} />
		])
	const controller = useContext(ControllerContext)
	const history = useNavigate()

	const [error, setError] = useState('')
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!isLastStep) return next()
		else {
			const response = await controller.signup(formState)
			if (response.error) setError(response.error)
			// if auth was successfull, then foce user to main page
			if (controller.appStore.getIsAuth) history('/')
			// console.log(formState)
		}
	}
	return (
		// fullscreen box
		<AuthContainer>
			<AuthForm onSubmit={handleSubmit}>
				{
					error && <Alert variant='outlined' color='error'>{error}</Alert>
				}

				{/* progress of signup */}
				<Stepper activeStep={currentStepIndex}>
					<Step> <StepLabel>Personal data</StepLabel> </Step>
					<Step> <StepLabel>Choose avatar</StepLabel> </Step>
					<Step> <StepLabel>write about you</StepLabel> </Step>
				</Stepper>

				{/* current step of form */}
				{step}

				{/* submit button of form */}
				<Button type="submit" variant='contained'>
					{isLastStep ? "Finish" : "Next"}
				</Button>

				{/* prev button of form */}
				{!isFirstStep &&
					<Button
						type='button'
						variant='outlined'
						onClick={() => back()}
					>
						Prev
					</Button>
				}

				{/* link to login page */}
				<Typography component='h5' variant='body1'>
					Already have an account?
					<Link component={RouterLink} to="/login">
						Login
					</Link>
				</Typography>
			</AuthForm>
		</AuthContainer>
	);
};

export default SignupPage;