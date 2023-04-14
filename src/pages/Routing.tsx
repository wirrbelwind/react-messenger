import PathRoutes from "shared/consts/routeConfig";
import { Route, Routes, useNavigate } from "react-router";
import { SigninPage } from "./auth/signin-page";
import { SignupPage } from "./auth/signup-page";
import { ChatPage } from "./chat-page";
import { SettingsPage } from "./settings-page";
import { CheckAuthRoute } from "shared/ui/CheckAuthRoute/CheckAuthRoute";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { authModule } from "shared/api/firebase";

export const Routing = () => {
    return (
        <Routes>
            <Route element={<SigninPage />} path={PathRoutes.public.SIGNIN} />
            <Route element={<SignupPage />} path={PathRoutes.public.SIGNUP} />

            <Route element={<CheckAuthRoute />}>
                <Route element={<ChatPage />} path={PathRoutes.private.CHAT} />
                <Route element={<SettingsPage />} path={PathRoutes.private.SETTINGS} />

            </Route>
        </Routes>
    );
}