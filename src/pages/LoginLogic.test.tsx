import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginLogic from "./LoginLogic";
import * as UseLoadingHook from "../hooks/UseLoading";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));


jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

jest.mock("../hooks/UseLoading", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    startLoading: jest.fn(),
    stopLoading: jest.fn(),
    isLoading: false,
  })),
}));

jest.mock("../components/LoginPage", () => (props: any) => (
  <div data-testid="login-page">
    <button data-testid="google-login-button" onClick={props.onGoogleLoginClick}>
      Google Login
    </button>
    <button data-testid="simulate-success" onClick={() => props.onLoginSuccess({ credential: "mock-credential" })}>
      Simulate Success
    </button>
    <button data-testid="simulate-error" onClick={props.onLoginError}>
      Simulate Error
    </button>
    {props.isLoading && <span role="progressbar">Loading...</span>}
  </div>
));

describe("LoginLogic Component", () => {
  const mockStartLoading = jest.fn();
  const mockStopLoading = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(UseLoadingHook, "default").mockReturnValue({
      startLoading: mockStartLoading,
      stopLoading: mockStopLoading,
      isLoading: false,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test("calls startLoading when the Google login button is clicked", async () => {
    render(<LoginLogic />);

    const googleLoginButton = screen.getByTestId("google-login-button");
    await userEvent.click(googleLoginButton);

    expect(mockStartLoading).toHaveBeenCalledTimes(1);
  });

  test("calls stopLoading, stores credentials in cookies, and navigates to home on successful login", async () => {
    render(<LoginLogic />);

    const simulateSuccessButton = screen.getByTestId("simulate-success");
    await userEvent.click(simulateSuccessButton);

    expect(mockStopLoading).toHaveBeenCalledTimes(1);
    expect(Cookies.set).toHaveBeenCalledWith("authToken", "mock-credential", {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("calls stopLoading and handles failed login", async () => {
    render(<LoginLogic />);

    const simulateErrorButton = screen.getByTestId("simulate-error");
    await userEvent.click(simulateErrorButton);

    expect(mockStopLoading).toHaveBeenCalledTimes(1);
  });

  test("displays loading spinner when isLoading is true", () => {
    jest.spyOn(UseLoadingHook, "default").mockReturnValueOnce({
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
      isLoading: true,
    });

    render(<LoginLogic />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
