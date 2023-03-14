import { Routing } from 'pages';
import { Route, Routes } from 'react-router';
import { withProviders } from './providers';
import './styles/index.scss';
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()
/*
new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			onError(error: any) {
				error.response.errors.forEach(async (err: any) => {
					if (err.message.includes('empty access token')) {
						try {
							await refreshAccessToken()
							query.refetch()
						} catch (error) {
							document.location.href = '/login';
						}
					}
				}
			}
		}
	}
})
*/

const App = () => {

	return (
		<Routing />
	);
};

export default withProviders(App);