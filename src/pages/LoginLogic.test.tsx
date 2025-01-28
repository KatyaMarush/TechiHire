import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginLogic from './LoginLogic';
import * as UseLoadingHook from '../hooks/UseLoading';

jest.mock('../hooks/UseLoading', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    startLoading: jest.fn(),
    stopLoading: jest.fn(),
    isLoading: false,
  })),
}));

jest.mock('../components/LoginPage', () => (props: any) => (
  <div data-testid="login-page">
    <button
      data-testid="google-login-button"
      onClick={props.onGoogleLoginClick}
    >
      Google Login
    </button>
    <button
      data-testid="simulate-success"
      onClick={() => props.onLoginSuccess({ credential: 'mock-credential' })}
    >
      Simulate Success
    </button>
    <button data-testid="simulate-error" onClick={props.onLoginError}>
      Simulate Error
    </button>
    {props.isLoading && <span role="progressbar">Loading...</span>}
  </div>
));

describe('LoginLogic Component', () => {
  const mockStartLoading = jest.fn();
  const mockStopLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(UseLoadingHook, 'default').mockReturnValue({
      startLoading: mockStartLoading,
      stopLoading: mockStopLoading,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.resetModules(); // Reset mocked modules after each test
  });

  test('calls startLoading when the Google login button is clicked', async () => {
    render(<LoginLogic />);

    const googleLoginButton = screen.getByTestId('google-login-button');
    await userEvent.click(googleLoginButton);

    expect(mockStartLoading).toHaveBeenCalledTimes(1);
  });

  test('calls stopLoading and handles successful login', async () => {
    render(<LoginLogic />);

    const simulateSuccessButton = screen.getByTestId('simulate-success');
    await userEvent.click(simulateSuccessButton);

    expect(mockStopLoading).toHaveBeenCalledTimes(1);
  });

  test('calls stopLoading and handles failed login', async () => {
    render(<LoginLogic />);

    const simulateErrorButton = screen.getByTestId('simulate-error');
    await userEvent.click(simulateErrorButton);

    expect(mockStopLoading).toHaveBeenCalledTimes(1);
  });

  test('displays loading spinner when isLoading is true', () => {
    jest.spyOn(UseLoadingHook, 'default').mockReturnValueOnce({
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
      isLoading: true,
    });

    render(<LoginLogic />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Check for spinner
  });
});
