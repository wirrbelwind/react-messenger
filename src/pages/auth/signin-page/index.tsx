import { LoginForm } from "features/login-form"
import { AlternateLayout } from "shared/ui/AlternateLayout"

export const SigninPage = () => {
	return (
		<AlternateLayout>
			<LoginForm />
		</AlternateLayout>
	)
}
