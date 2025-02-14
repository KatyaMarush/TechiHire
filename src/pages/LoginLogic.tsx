import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import { CredentialResponse } from '@react-oauth/google';
import Cookies from "js-cookie";
import UseLoading from '../hooks/UseLoading';

const LoginLogic: React.FC = () => {
    const { startLoading, stopLoading, isLoading } = UseLoading();
    const navigate = useNavigate()

    const handleLoginSuccess = (response: CredentialResponse) => {
        stopLoading();
        
        if (response.credential) {
            Cookies.set("authToken", response.credential, {expires: 1, secure: true, sameSite: "Strict"}); // Store token
            navigate("/home"); // Redirect to home
        }
    };
    
    

    const handleLoginError = () => { 
        stopLoading();       
        console.log('Login failed');    
    }

    const onGoogleLoginClick = () => {
        startLoading();
      };


    return <LoginPage 
            onLoginSuccess={handleLoginSuccess}
            onLoginError={handleLoginError}
            onGoogleLoginClick={onGoogleLoginClick}
            isLoading={isLoading} />;
};

export default LoginLogic;