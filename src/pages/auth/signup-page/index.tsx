import { RegistrationForm } from "features/registration-form";
import { AlternateLayout } from "shared/ui/AlternateLayout";

export const SignupPage = () => {
	return (
		<AlternateLayout>
			<RegistrationForm />
		</AlternateLayout>
	)
}