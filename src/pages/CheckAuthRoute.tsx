import { Navigate, Outlet } from "react-router"
import routeConfig from "shared/configs/routes.config"
import { useUser } from "shared/libs/hooks/useUser"

export const CheckAuthRoute = () => {

	const { user, loading, error } = useUser()
	if (!user && !loading) {
		return <Navigate to={routeConfig.public.SIGNIN} />
	}

	else {
		return <Outlet />
	}
}