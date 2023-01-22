import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { ControllerContext } from '../../Helpers/initStores'

const UnauthorizedRoutes = () => {
    const controller = useContext(ControllerContext)
    return(
        !controller.appStore.getIsAuth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default UnauthorizedRoutes