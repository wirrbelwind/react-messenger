import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Input from '@mui/material/Input';
import { ControllerContext } from '../../../Helpers/initStores';
import useInput from '../../../Hooks/useInput';
import AuthContainer from '../UI/AuthContainer';
import AuthForm from '../UI/AuthForm';
import Alert from '@mui/material/Alert';
import { AxiosError } from 'axios';


const LoginPage = () => {
	// controller
	const controller = useContext(ControllerContext)

	// state managing of showPassword button
	const [showPassword, setShowPassword] = React.useState(false);

	// login and password states
	const login = useInput('')
	const password = useInput('')

	// hook for navigate to main page after successfull auth
	const history = useNavigate()
	// state
	const [error, setError] = useState('')
	// onSubmit func
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//tries to auth
		const response = await controller.login(login.value.toString(), password.value.toString())

		if (response.error) setError(response.error)

		// if auth was successfull, then redirect user to main page
		if (controller.appStore.getIsAuth) history('/')
	}

	return (
		<AuthContainer>

			<AuthForm
				onSubmit={handleSubmit}
			>
				<Typography component='h2' variant='h1' textAlign={'center'}>Login</Typography>

				{
					error && <Alert variant='outlined' color='error'>{error}</Alert>
				}

				{/* Nickname input */}
				<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
					<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
					<TextField
						id="input-with-sx"
						label="Nickname/Email"
						variant="standard"
						fullWidth
						value={login.value}
						onChange={login.onChange}
					/>
				</Box>

				{/* Password */}
				<FormControl variant="standard" fullWidth>
					<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
					<Input fullWidth
						value={password.value}
						onChange={password.onChange}
						id="standard-adornment-password"
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword((show) => !show)}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>

				{/* Submit btn */}
				<Button type='submit' variant='contained' sx={{ marginY: 1.3 }}>Login</Button>

				{/* Link to signup */}

				<Typography component='p' variant='body1'>
					Are you new here?
					<Link component={RouterLink} to="/signup">
						Create an account
					</Link>
				</Typography>
			</AuthForm>

		</AuthContainer>
	);
};

export default LoginPage;