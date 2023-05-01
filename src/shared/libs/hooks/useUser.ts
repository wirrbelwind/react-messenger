import { useAuthState } from 'react-firebase-hooks/auth'
import { authModule } from 'shared/api/firebase'

export const useUser = () => {
	const [user, loading, error] = useAuthState(authModule)

	return {
		user,
		loading,
		error
	}
}