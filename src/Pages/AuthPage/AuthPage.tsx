import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import AuthForm from '../../Components/AuthForm/RootForm/AuthForm';
import { ControllerContext } from '../../Helpers/context';
import classes from './AuthPage.module.scss'

const AuthPage = () => {
	const controller = useContext(ControllerContext)
	if (controller.getIsAuth) return <Navigate to="/" />

	return (
		<div className={classes.container}>
			<AuthForm />
		</div>
	);
};

export default AuthPage;