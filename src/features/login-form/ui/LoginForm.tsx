import { LoadingButton } from "@mui/lab"
import { TextField } from "@mui/material"
import { userModel } from "entities/user"
import useInput from "shared/libs/hooks/useInput"
import { IOnSubmit, useRedirectOnSignIn } from "../model"
import { FormContainer } from "./styled/FormContainer"
import { SubmitButton } from "./styled/SubmitButton"
import { Input } from "./styled/Input"

interface LoginFormFeatureProps {
	onSubmit: IOnSubmit
}

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
		<FormContainer component='form' onSubmit={handleSubmit}>

			<Input
				value={login.value}
				onChange={login.onChange}
				label='Login'
				autoFocus
			/>

			<Input
				value={pwd.value}
				onChange={pwd.onChange}
				label='Password'
			/>
			
			{signinError && <h1>error</h1>}

			<SubmitButton disabled={signinLoading} loading={signinLoading}>
				Sign In
			</SubmitButton>

		</FormContainer>
	)
}
