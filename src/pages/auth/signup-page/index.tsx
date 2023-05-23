import { SignUpFormFeature } from "features/reg-form";
import { FormWrapper } from "shared/ui/Form/FormWrapper"
import { onSubmit } from "./model/IOnSubmit";

export const SignupPage = () => {
	return (
		<FormWrapper>
			<SignUpFormFeature onSubmit={onSubmit} />
		</FormWrapper>
	)
}
