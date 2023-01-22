import React, { FC, useContext, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import './Styles/root-style.scss'
import { ControllerContext } from '../../Helpers/initStores';
import { Route, Routes, useNavigate } from 'react-router';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from '../../Pages/ErrorPage/ErrorPage';
import SettingsPage from '../../Pages/SettingsPage/SettingsPage';
import MainPageView from '../../Pages/MainPage/MainPage';
import LoginPage from '../../Pages/AuthPages/LoginPage/LoginPage';
import SignupPage from '../../Pages/AuthPages/SignupPage/SignupPage';
import UnauthorizedRoutes from '../UnauthorizedRoutes/UnauthorizedRoutes';
import Loading from '../Loading/Loading';

const AppRouter: FC = () => {
  const controller = useContext(ControllerContext)

  useEffect(() => {
    controller.checkAuth()
  }, [])

  if (controller.appStore.getIsLoading) {
    return (<Loading />);
  }

  else
    return (

      <Routes>

        {/* Private routes for authorized user */}
        <Route element={<PrivateRoutes />}>
          <Route element={<MainPageView />} path="/" />
          <Route element={<SettingsPage />} path="/settings" />
        </Route>

        {/* Public routes for unauthorized users */}
        <Route element={<UnauthorizedRoutes />}>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignupPage />} path="/signup" />
        </Route>

        <Route element={<ErrorPage />} path="*" />

      </Routes>
    )
};

export default observer(AppRouter);