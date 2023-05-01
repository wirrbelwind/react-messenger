import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HOC } from 'shared/providers/composeHOCS';

export const withRouter: HOC = (WrappedComponent) => {
	return () => (
		<BrowserRouter>
			<Suspense fallback='Loading...'>
				<WrappedComponent />
			</Suspense>
		</BrowserRouter>
	);
};