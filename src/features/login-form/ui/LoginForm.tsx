import { LoadingButton } from "@mui/lab"
import { Paper, TextField } from "@mui/material"
import { userModel } from "entities/user"
import { useNavigate } from "react-router"
import useInput from "shared/libs/hooks/useInput"
import HowToRegIcon from '@mui/icons-material/HowToReg';

export const LoginFormFeature = () => {
	const navigate = useNavigate()
	const login = useInput<string>('')
	const pwd = useInput<string>('')

	const [signin, signedInUser, signinLoading, signinError] = userModel.useSigninEmailPwd()

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		signin(login.value, pwd.value)
	}

	if (signedInUser) navigate('/', { replace: true })

	return (
		<Paper
			component={'form'}
			sx={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'white', padding: '20px', borderRadius: '5px' }}
			onSubmit={onSubmit}
		>

			<TextField
				value={login.value}
				onChange={login.onChange}
				fullWidth
				label='Login'
				autoFocus
			/>
			<TextField
				value={pwd.value}
				onChange={pwd.onChange}
				fullWidth
				label='Password'
			/>
			{signinError && <h1>error</h1>}

			<LoadingButton
				type='submit'
				fullWidth
				variant='contained'
				loading={signinLoading}
				loadingPosition="end"
				endIcon={<HowToRegIcon />}
				loadingIndicator='Loading...'
				disabled={signinLoading}
			>
				Sign In
			</LoadingButton>
		</Paper>
	)
}