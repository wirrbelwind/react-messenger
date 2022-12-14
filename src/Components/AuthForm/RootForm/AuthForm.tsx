import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useMemo, useState } from 'react';
import { useGlobalContext } from '../../../Config/Context';
import { ControllerContext } from '../../../Helpers/context';
import useInput, { IUseInput } from '../../../Hooks/useInput';
import signInLayout from '../SignInLayout/signInLayout';
import classes from './AuthForm.module.scss';

const formStatus = {
	signIn: 'Sign In',
	signUp: 'Sign Up',
	forgot: 'Forgot password'
}
type formStatusKeys = keyof typeof formStatus;
type formStatusType = typeof formStatus[formStatusKeys];

const AuthForm: FC = () => {
	const [formState, setFormState] = useState<formStatusType>('Sign In')
	const login = useInput('')
	const password = useInput('')

	const controller = useContext(ControllerContext)

	const handleSwitchForm = (e: React.FormEvent<HTMLButtonElement>) => {
		if (!e.currentTarget.textContent) return;

		if (Object.values(formStatus).includes(e.currentTarget.textContent)) {
			setFormState(e.currentTarget.textContent)
		}
	}
	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault()
	}

	return (
		<form className={classes.container} >
			<div className={classes.header}>
				<button
					onChange={handleSwitchForm} className={classes.header_btn}
				>
					{formStatus.signIn}
				</button>
				<button
					onChange={handleSwitchForm}
					className={classes.header_btn}
				>
					{formStatus.signUp}
				</button>
			</div>

			{
				formState && <signInLayout/>
			}
			<button type='submit' onSubmit={handleSubmit}>{formState}</button>
			<button type='submit' onSubmit={handleSubmit}>{formStatus.forgot}</button>
		</form>
	)
};

export default AuthForm;