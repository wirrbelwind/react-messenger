import { Box, Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink, Route, Routes } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

type step1Data = {
	nickname: string
	email: string
	password: string
}

type step1Props = step1Data & {
	updateFields: (fields: Partial<step1Data>) => void
}

const SignupStep1 = ({ nickname, email, password, updateFields }: step1Props) => {
	// state of showPwd-button
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<>
			{/* Nickname */}
			<TextField
				required
				label="Nickname"
				variant="standard"
				value={nickname}
				onChange={e => updateFields({ nickname: e.target.value })}
			/>

			{/* Email */}
			<TextField
				required
				label="Email"
				type='email'
				variant="standard"
				value={email}
				onChange={e => updateFields({ email: e.target.value })}
			/>
			{/* Password */}
			<FormControl variant="standard" >
				<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
				<Input
					required
					value={password}
					onChange={e => updateFields({ password: e.target.value })}
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
		</>
	);
};

export default SignupStep1;