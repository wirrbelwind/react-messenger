import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { ControllerContext } from '../../Helpers/context'

const PrivateRoutes = () => {
    const controller = useContext(ControllerContext)
    return(
        controller.getIsAuth ? <Outlet/> : <Navigate to="/auth"/>
    )
}

export default PrivateRoutes