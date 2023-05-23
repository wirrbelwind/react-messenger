import pathRoutes from "shared/configs/routes.config";
import { Route, Routes } from "react-router";
import { SigninPage } from "./auth/signin-page/ui/SigninPage";
import { SignupPage } from "./auth/signup-page";
import { ChatPage } from "./chat-page/ui/ChatPage";
import { SettingsPage } from "./settings-page";
import { CheckAuthRoute } from "pages/CheckAuthRoute";

export const Routing = () => {
    return (
        <Routes>
            <Route element={<SigninPage />} path={pathRoutes.public.SIGNIN} />
            <Route element={<SignupPage />} path={pathRoutes.public.SIGNUP} />

            <Route element={<CheckAuthRoute />}>
                <Route element={<ChatPage />} path={pathRoutes.private.CHAT} />
                <Route element={<SettingsPage />} path={pathRoutes.private.SETTINGS} />
            </Route>

            {/* <Route path="*" element={ErrorPage} /> */}
        </Routes>
    );
}