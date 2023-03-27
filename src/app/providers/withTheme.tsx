import { CssBaseline } from '@mui/material';
import React, { Suspense } from 'react';
import { HOC } from './composeHOCS';

export const withTheme: HOC<{}> = (WrappedComponent) => {

	return (props) => (
		<>
			<CssBaseline />
			<WrappedComponent />
		</>
	);
};