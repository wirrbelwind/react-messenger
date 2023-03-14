import PathRoutes from "pages/routeConfig";
import { Route, Routes } from "react-router-dom";
import { SigninPage } from "./auth/signin-page";
import { SignupPage } from "./auth/signup-page";
import { ChatPage } from "./chat-page";
import { SettingsPage } from "./settings-page";

export const Routing = () => {
    return (
        <Routes>
            <Route element={<SigninPage />} path={PathRoutes.SIGNIN} />
            <Route element={<SignupPage />} path={PathRoutes.SIGNUP} />
            <Route element={<ChatPage />} path={PathRoutes.CHAT} />
            <Route element={<SettingsPage />} path={PathRoutes.SETTINGS} />
        </Routes>
    );
};