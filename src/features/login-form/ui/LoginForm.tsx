import { userModel } from "entities/user"
import { IOnSubmit, ISignInFields } from "../model"
import { AuthFormContainer } from "shared/ui/Form/AuthFormContainer"
import { SubmitHandler, useForm } from "react-hook-form"
import { InputEmail } from "shared/ui/Form/Inputs/InputEmail"
import { InputPassword } from "shared/ui/Form/Inputs/InputPassword";
import SubmitBtn from "../../../shared/ui/SubmitBtn"
import { useRedirectOnSignIn } from "shared/libs/hooks/useRedirectOnSignIn"
import { FormError } from "shared/ui/Form/Alerts/FormError"
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

interface LoginFormFeatureProps {
	onSubmit: IOnSubmit
}

export const LoginFormFeature = (props: LoginFormFeatureProps) => {
	const { control, handleSubmit, watch, formState: { errors } } = useForm<ISignInFields>
		({
			defaultValues: {
				email: '',
				pwd: '',
			}
		})

	const [signin, signedInUser, signinLoading, signinError] = userModel.useSigninEmailPwd()

	const onSubmit: SubmitHandler<ISignInFields> = (fields) => {
		const { email, pwd } = fields

		props.onSubmit(email, pwd, signin)
	}

	useRedirectOnSignIn(signedInUser, '/')

	return (
		<AuthFormContainer>
			<Typography textAlign='center' variant='h3'>Sign In</Typography>

			<InputEmail controller={control} />
			{errors.email && <FormError>Email is wrong</FormError>}

			<InputPassword controller={control} />
			{errors.pwd && <FormError>Password is wrong</FormError>}

			{signinError && <FormError>{signinError.message}</FormError>}

			<Typography
				variant="subtitle1"
				component={Link}
				to='/signup'
				color='primary.dark'
				fontSize={18}
			>
				Don't have an account? Sign Up!
			</Typography>

			<SubmitBtn
				loading={signinLoading}
				onClick={handleSubmit(onSubmit)}
				disabled={signinLoading}
			>
				Sign In
			</SubmitBtn>

		</AuthFormContainer>
	)
}
