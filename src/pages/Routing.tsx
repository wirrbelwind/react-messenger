import PathRoutes from "shared/consts/routeConfig";
import { Route, Routes } from "react-router";
import { SigninPage } from "./auth/signin-page";
import { SignupPage } from "./auth/signup-page";
import { ChatPage } from "./chat-page/ui/ChatPage";
import { SettingsPage } from "./settings-page";
import { CheckAuthRoute } from "pages/CheckAuthRoute";

export const Routing = () => {
    return (
        <Routes>
            <Route element={<SigninPage />} path={PathRoutes.public.SIGNIN} />
            <Route element={<SignupPage />} path={PathRoutes.public.SIGNUP} />

            <Route element={<CheckAuthRoute />}>
                <Route element={<ChatPage />} path={PathRoutes.private.CHAT} />
                <Route element={<SettingsPage />} path={PathRoutes.private.SETTINGS} />
            </Route>

            {/* <Route path="*" element={ErrorPage} /> */}
        </Routes>
    );
}