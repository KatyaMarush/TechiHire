import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginLogic from "../pages/LoginLogic";
import HomePage from "../pages/HomePage";
import Cookies from "js-cookie";

const AppRoutes: React.FC = () => {
    const isAuthenticated = () => {
        return Cookies.get("authToken") !== undefined;
    };

    return (
        <Router>
            <Routes>
                {/* If the user is logged in, redirect to home, else show login */}
                <Route path="/login" element={isAuthenticated() ? <Navigate to="/" replace /> : <LoginLogic />} />
                
                {/* Home Page (Protected Route) */}
                <Route path="/home" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
