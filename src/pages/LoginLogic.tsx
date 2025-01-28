import React from 'react';
import LoginPage from '../components/LoginPage';
import { CredentialResponse } from '@react-oauth/google';
import UseLoading from '../hooks/UseLoading';

const LoginLogic: React.FC = () => {
    const { startLoading, stopLoading, isLoading } = UseLoading();

    const handleLoginSuccess = async (response: CredentialResponse) => {
        stopLoading();
        const token = response.credential; // Save token securely
        console.log('Token:', token);
        // Simulate async work
        await new Promise((resolve) => setTimeout(resolve, 1000));
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