import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HOC } from './composeHOCS';

export const withRouter: HOC<{}> = (WrappedComponent) => {

	return (props) => (
		<BrowserRouter>
			<Suspense fallback='Loading...'>
				<WrappedComponent />
			</Suspense>
		</BrowserRouter>
	);
};