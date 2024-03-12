import React, { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import SigninPage from "../SigninPage";
import VerifyPage from "../VerifyPage";
import ForgetPWPage from "../ForgetPWPage";
import RegisterPage from "../RegisterPage";
import ErrorPage from "../ErrorPage";
import NotFoundPage from "../NotFoundPage";
import Home from "../Home";
import Admin from "../Admin";
import DeniedPage from "../DeniedPage";

type Props = {}

const PrivateRoutes = () => {
    const { authenticated } = useContext(AuthContext);
    if (!authenticated) return <Navigate to='/' replace />
    return <Outlet />
}

const RoleRoutes = () => {
    const { role } = useContext(AuthContext);
    if (role === "ROLE_USER") return <Navigate to='/accessdenied' replace={true} />

    return <Outlet />
}

const PublicRoutes = () => {
    const { authenticated } = useContext(AuthContext);
    if (authenticated) return <Navigate to='/home' replace />
    return <Outlet />
}

const Routes = (props: Props) => {
    return (
        <Router>
            <Route element={<PublicRoutes />}>
                <Route path="/" element={<SigninPage />} />
                <Route path="/verifyOtp" element={<VerifyPage />} />
                <Route path="/forget_password" element={<ForgetPWPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Home />}/> 
                <Route path="/accessdenied" element={<DeniedPage />} />
                <Route element={<RoleRoutes />}>
                    <Route path="/admin" element={<Admin />} />
                </Route>
            </Route>

            <Route path="/error" element={<ErrorPage />} />
            <Route path="/*" element={<NotFoundPage />} />

        </Router>
    );
}

export default Routes;