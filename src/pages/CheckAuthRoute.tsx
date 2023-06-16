import { userModel } from "entities/user"
import { Navigate, Outlet } from "react-router"
import routeConfig from "shared/configs/routes.config"

export const CheckAuthRoute = () => {
	const { user, loading, error } = userModel.useUser()
	if (!user && !loading) return <Navigate to={routeConfig.public.SIGNIN} />
	else return <Outlet />
}