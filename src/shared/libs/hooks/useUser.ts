import { useAuthState } from 'react-firebase-hooks/auth'
import { authModule } from 'shared/api/firebase'

export const useUser = () => {
	const [user, loading, error] = useAuthState(authModule)

	// useEffect(() => {
	// 	if (!user && !loading && !error) history(routeConfig.public.SIGNIN)
	// }, [user])

	return {
		user,
		loading, 
		error 
	}
}