import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'shared/api'

export const useUser = () => {
	const [user, loading, error] = useAuthState(firebase.authModule)

	return {
		user,
		loading,
		error
	}
}
