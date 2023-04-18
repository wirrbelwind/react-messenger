import { Alert, Box, Button, Paper, styled, TextField, Typography } from "@mui/material"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
// import { useSignupFormSteps } from "../model"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { authModule } from "shared/api/firebase"
import { FormData } from "../lib"


const Form = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper
}))

export const SignUpForm = () => {
	const { control, handleSubmit, formState: { errors, } } = useForm<FormData>({
		defaultValues: {
			email: '',
			confirmPwd: '',
			pwd: '',
			name: '',
			photoBase64: '',
			photoURL: ''
		}
	})

	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		error,
	] = useCreateUserWithEmailAndPassword(authModule)

	const onSubmit: SubmitHandler<FormData> = fields => {

	}

	return (
		<Form
			component='form'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Typography
				textAlign='center'
				variant="h3">
				Sign Up
			</Typography>

			<Controller
				rules={{
					required: true,
					pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				}}
				name="email"
				control={control}
				render={({ field }) => <TextField {...field} label='Email' variant='filled' />}
			/>
			{errors.email && <Alert severity="error">Почта указана некорректно</Alert>}

			<Controller
				rules={{
					required: true,
					minLength: 3,
					maxLength: 30
				}}
				name="name"
				control={control}
				render={({ field }) => <TextField {...field} label='Nickname' variant='filled' />}
			/>
			{errors.name && <Alert severity="error">Имя должно состоять из 3-30 символов</Alert>}

			<Controller
				rules={{
					required: true,
					minLength: 6,
					maxLength: 50
				}}
				name="pwd"
				control={control}
				render={({ field }) => <TextField {...field} label='Password' variant='filled' />}
			/>
			{errors.pwd && <Alert severity="error">Имя должно состоять из 3-30 символов</Alert>}

			<Controller
				rules={{
					required: true,
					minLength: 6,
					maxLength: 30,
				}}
				name="confirmPwd"
				control={control}
				render={({ field }) => <TextField {...field} label='Confirm password' variant='filled' />}
			/>
			{errors.confirmPwd && <Alert severity="error">Пароли не совпадают</Alert>}


			<Button
				type='submit'
				variant='contained'
			>
				Create
			</Button>
		</Form>
	)
}