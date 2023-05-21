import { LoadingButton } from "@mui/lab"
import { Paper, TextField } from "@mui/material"
import { userModel } from "entities/user"
import { useNavigate } from "react-router"
import useInput from "shared/libs/hooks/useInput"
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { UserCredential } from "firebase/auth"
import { IOnSubmit, useRedirectOnSignIn } from "../model"
import styled from "@emotion/styled"

interface LoginFormFeatureProps {
	onSubmit: IOnSubmit
}

const FormContainer = styled(Paper)({
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	background: 'white',
	padding: '20px',
	borderRadius: '5px'
})

export const LoginFormFeature = (props: LoginFormFeatureProps) => {
	const { onSubmit } = props

	const login = useInput<string>('')
	const pwd = useInput<string>('')

	const [signin, signedInUser, signinLoading, signinError] = userModel.useSigninEmailPwd()

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()

		onSubmit(login.value, pwd.value, signin)
	}

	useRedirectOnSignIn(signedInUser, '/')

	return (
		<FormContainer
			component='form'
			onSubmit={handleSubmit}
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
		</FormContainer>
	)
}