import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'
import routeConfig from 'shared/consts/routeConfig'
import { authModule } from 'shared/api/firebase'

export const useUser = () => {
	const [user, loading, error] = useAuthState(authModule)

	const history = useNavigate()

	useEffect(() => {
		if (!user && !loading && !error) history(routeConfig.public.SIGNIN)
	}, [user])

	return {user, loading, error}
}