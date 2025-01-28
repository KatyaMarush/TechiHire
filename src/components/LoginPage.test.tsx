import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';

// Mock the GoogleLogin component
jest.mock('@react-oauth/google', () => ({
  GoogleLogin: (props: { onSuccess: () => void; onError: () => void }) => (
    <button
      data-testid="google-login-button"
      onClick={() => props.onSuccess()}
      onDoubleClick={() => props.onError()} // Simulate error on double-click
    >
      Google Login
    </button>
  ),
}));

describe('LoginPage Component', () => {
  const mockOnLoginSuccess = jest.fn();
  const mockOnLoginError = jest.fn();
  const mockOnGoogleLoginClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the LoginPage component correctly', () => {
    render(
      <LoginPage
        onLoginSuccess={mockOnLoginSuccess}
        onLoginError={mockOnLoginError}
        onGoogleLoginClick={mockOnGoogleLoginClick}
        isLoading={false}
      />
    );

    // Check if the header and subtitle are rendered
    expect(screen.getByText(/Welcome to TechiHire/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please sign in with Google to continue./i)
    ).toBeInTheDocument();

    // Ensure the Google login button is rendered
    expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
  });

  test('shows a loader when isLoading is true', () => {
    render(
      <LoginPage
        onLoginSuccess={mockOnLoginSuccess}
        onLoginError={mockOnLoginError}
        onGoogleLoginClick={mockOnGoogleLoginClick}
        isLoading={true}
      />
    );

    // Ensure loader is displayed
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Ensure the Google login button is not displayed
    expect(screen.queryByTestId('google-login-button')).not.toBeInTheDocument();
  });

  test('calls onGoogleLoginClick when the Google login wrapper is clicked', async () => {
    render(
      <LoginPage
        onLoginSuccess={mockOnLoginSuccess}
        onLoginError={mockOnLoginError}
        onGoogleLoginClick={mockOnGoogleLoginClick}
        isLoading={false}
      />
    );

    const googleLoginWrapper = screen.getByTestId('google-login-button').parentElement;
    if (googleLoginWrapper) {
      await userEvent.click(googleLoginWrapper);
    }

    expect(mockOnGoogleLoginClick).toHaveBeenCalledTimes(1);
  });

  test('calls onLoginSuccess when Google login is successful', async () => {
    render(
      <LoginPage
        onLoginSuccess={mockOnLoginSuccess}
        onLoginError={mockOnLoginError}
        onGoogleLoginClick={mockOnGoogleLoginClick}
        isLoading={false}
      />
    );

    const googleLoginButton = screen.getByTestId('google-login-button');
    await userEvent.click(googleLoginButton);

    expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1);
  });

  test('calls onLoginError when Google login fails', async () => {
    render(
      <LoginPage
        onLoginSuccess={mockOnLoginSuccess}
        onLoginError={mockOnLoginError}
        onGoogleLoginClick={mockOnGoogleLoginClick}
        isLoading={false}
      />
    );

    const googleLoginButton = screen.getByTestId('google-login-button');
    // Simulate an error by double-clicking the button
    await userEvent.dblClick(googleLoginButton);
    expect(mockOnLoginError).toHaveBeenCalledTimes(1);
  });
});
