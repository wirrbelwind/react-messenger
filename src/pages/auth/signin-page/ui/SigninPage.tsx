import { LoginFormFeature } from "features/login-form"
import { FormContainer } from "shared/ui/FormContainer"
import { onSignInSubmit } from "../model"

export const SigninPage = () => {
	return (
		<FormContainer>
			<LoginFormFeature onSubmit={onSignInSubmit}/>
		</FormContainer>
	)
}

