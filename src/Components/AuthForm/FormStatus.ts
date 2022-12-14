export default () => {
	const formStatus = {
		signIn: 'Sign In',
		signUp: 'Sign Up'
	}
	type Keys = keyof typeof formStatus;
	type Values = typeof formStatus[Keys];
}