import { Navigate, Outlet } from "react-router"
import routeConfig from "shared/consts/routeConfig"
import { useUser } from "shared/libs/hooks/useUser"

export const CheckAuthRoute = () => {
	const [user] = useUser()

	return !!user ? <Outlet/> : <Navigate to={routeConfig.public.SIGNIN}/>
}