import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, Outlet, useNavigate } from "react-router"
import routeConfig from "shared/consts/routeConfig"
import { authModule } from "shared/firebase"
import { useUser } from "shared/libs/hooks/useUser"

export const CheckAuthRoute = () => {

	const [user, loading, error] = useAuthState(authModule)
	if (!user && !loading && !error) return <Navigate to={routeConfig.public.SIGNIN}/> 


	return <Outlet />
}