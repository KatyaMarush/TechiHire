import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginLogic from "../pages/LoginLogic";
import HomePage from "../pages/HomePage";
import Cookies from "js-cookie";

const AppRoutes: React.FC = () => {
    const isAuthenticated = () => Cookies.get("authToken") !== undefined;

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" replace />} />
                <Route path="/login" element={isAuthenticated() ? <Navigate to="/" replace /> : <LoginLogic />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
