import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { ControllerContext } from '../../Helpers/initStores'

const PrivateRoutes = () => {
    const controller = useContext(ControllerContext)
    return(
        controller.appStore.getIsAuth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes