import React, { useState } from 'react';
import { Container, Typography, Box, CircularProgress, ButtonBase } from '@mui/material';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface LoginPageProps {
  onLoginSuccess: (response: CredentialResponse) => void;
  onLoginError: () => void;
  onGoogleLoginClick: () => void;
  isLoading: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onLoginError,
  onLoginSuccess,
  onGoogleLoginClick,
  isLoading,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginError = () => {
    setErrorMessage('Login failed. Please try again.');
    onLoginError();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 10,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to TechiHire
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        Please sign in with Google to continue.
      </Typography>

      <Box mt={4} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ButtonBase
            onClick={onGoogleLoginClick}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "auto",
              borderRadius: "4px",
            }}
          >
            <GoogleLogin 
              onSuccess={onLoginSuccess} 
              onError={handleLoginError}
              ux_mode="popup"
              useOneTap={false}/>
          </ButtonBase>
        )}
      </Box>

      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Container>
  );
};

export default LoginPage;
