import { userModel } from "entities/user";

type submitSignUp = ReturnType<typeof userModel.useCreateUserEmailPwd>[0]

export type IOnSubmit = (
	email: string,
	pwd: string,
	nickname: string,
	signUp: submitSignUp
) => void;
