import { IOnSubmit } from "features/reg-form/model";

export const onSubmit: IOnSubmit = (email, pwd, name, signUp) => {
	signUp(email, pwd)
}