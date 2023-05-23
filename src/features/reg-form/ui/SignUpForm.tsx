import { Divider, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { IOnSubmit, IRegFormTemplate } from "../model"
import { userModel } from "entities/user"
import { Title } from "./Title"
import { AuthFormContainer } from "shared/ui/Form/AuthFormContainer"
import { FormError } from "shared/ui/Form/Alerts/FormError"
import { LoadingButton } from "@mui/lab"
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { InputEmail } from "shared/ui/Form/Inputs/InputEmail"
import { InputNickname } from "shared/ui/Form/Inputs/InputNickname"
import { InputPassword } from "shared/ui/Form/Inputs/InputPassword"
import { InputConfirmPassword } from "shared/ui/Form/Inputs/InputConfirmPassword"
import SubmitBtn from "shared/ui/SubmitBtn"
import { useRedirectOnSignIn } from "shared/libs/hooks/useRedirectOnSignIn"
import { Link } from "react-router-dom"

interface SignUpFormProps {
	onSubmit: IOnSubmit
}

export const SignUpForm = (props: SignUpFormProps) => {
	const { control, handleSubmit, watch, formState: { errors } } = useForm<IRegFormTemplate>({
		defaultValues: {
			email: '',
			name: '',
			pwd: '',
			confirmPwd: '',
			photoURL: '',
			photoBase64: ''
		}
	})

	// create user hook
	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		signUpError,
	] = userModel.useCreateUserEmailPwd()


	const onSubmit: SubmitHandler<IRegFormTemplate> = (fields) => {
		const { email, name, pwd } = fields
		props.onSubmit(email, pwd, name, createUserWithEmailAndPassword)
	}

	useRedirectOnSignIn(user, '/')

	return (
		<AuthFormContainer>
			<Title>Sign Up</Title>
			<Divider />

			<InputEmail controller={control} />
			{errors.email && <FormError>Email is wrong</FormError>}

			<InputNickname controller={control} />
			{errors.name && <FormError>Name is not correct</FormError>}

			<InputPassword controller={control} />
			{errors.pwd && <FormError>Password is not correct</FormError>}

			<InputConfirmPassword controller={control} watch={watch} />
			{errors.confirmPwd && <FormError>Confirmed password is not correct</FormError>}


			{ signUpError && <FormError>{signUpError.message}</FormError>}

			<Typography
				variant="subtitle1"
				component={Link}
				to='/signin'
				color='primary.dark'
				fontSize={18}
			>
				Don't have an account? Sign Up!
			</Typography>

			<SubmitBtn
				onClick={handleSubmit(onSubmit)}
				loading={loading}
				disabled={loading}
			>
				Create account
			</SubmitBtn>

		</AuthFormContainer>
	)
}
