import { UserCredential } from "firebase/auth"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import pathRoutes from "shared/configs/routes.config";

export function useRedirectOnSignIn(
	signedInUser: UserCredential | undefined, 
	to: string
	) {
	const navigate = useNavigate()

	useEffect(() => {
		if (signedInUser) navigate(to, { replace: true })
	}, [signedInUser])
}