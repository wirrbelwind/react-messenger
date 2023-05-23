import { LoginFormFeature } from "features/login-form"
import { FormWrapper } from "shared/ui/Form/FormWrapper"
import { onSignInSubmit } from "../model"

export const SigninPage = () => {
	return (
		<FormWrapper>
			<LoginFormFeature onSubmit={onSignInSubmit} />
		</FormWrapper>
	)
}