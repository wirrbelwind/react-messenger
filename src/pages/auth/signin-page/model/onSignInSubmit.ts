import { IOnSubmit } from "features/login-form/model";

export const onSignInSubmit: IOnSubmit = (email, password, signIn) => {
	signIn(email, password)
}