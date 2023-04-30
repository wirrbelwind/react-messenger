import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HOC } from 'shared/providers/composeHOCS';

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export const withQueryClient: HOC = (WrappedComponent) => {
	return () => (
		<QueryClientProvider client={client}>
			<WrappedComponent />
		</QueryClientProvider>
	)
}
