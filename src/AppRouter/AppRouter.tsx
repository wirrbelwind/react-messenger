import React, { FC, useContext, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import './Styles/root-style.scss'
import { ControllerContext } from '../Helpers/context';
import { Route, Routes } from 'react-router';
import PrivateRoutes from '../Components/PrivateRoutes/PrivateRoutes';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage/AuthPage';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import SettingsPage from '../Pages/SettingsPage/SettingsPage';
import MainPageView from '../Pages/MainPage/MainPageView';

const AppRouter: FC = () => {
  const controller = useContext(ControllerContext)

  useEffect(() => {
    controller.checkAuth()
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<MainPageView />} path="/"/>
          <Route element={<SettingsPage />} path="/settings" />
        </Route>
        <Route element={<AuthPage/>} path="/auth" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default observer(AppRouter);

