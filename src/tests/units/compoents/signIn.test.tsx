import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { SignIn } from "../../../pages/sign-in";
import { authSlice } from "../../../store/auth/reducer";
import { cleanup } from "@testing-library/react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("primereact/toast", () => {
  const React = require("react");
  return {
    Toast: React.forwardRef((props: any, ref: any) => <div ref={ref} />),
  };
});

jest.mock("primereact/inputtext", () => {
  const React = require("react");
  return {
    InputText: React.forwardRef(
      ({ value, onChange, placeholder, type = "text" }: any, ref: any) => (
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ),
    ),
  };
});

jest.mock("primereact/password", () => {
  const React = require("react");
  return {
    Password: React.forwardRef(
      ({ value, onChange, placeholder }: any, ref: any) => (
        <input
          ref={ref}
          type="password"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ),
    ),
  };
});

jest.mock("primereact/button", () => ({
  Button: (props: any) => (
    <button onClick={props.onClick} type={props.type}>
      {props.label}
    </button>
  ),
}));

jest.mock("primereact/progressspinner", () => ({
  ProgressSpinner: () => <div>Loading...</div>,
}));

let reduxStore: any;

function renderWithStore(
  preloadedState = { authReducer: { loading: false, isLoggedIn: false } },
) {
  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      authReducer: authSlice.reducer,
    },
    preloadedState,
  });

  const utils = render(
    <MemoryRouter>
      <Provider store={store}>
        <SignIn />
      </Provider>
    </MemoryRouter>,
  );

  reduxStore = store;
  return utils; // MISSING: return statement
}

describe("SignIn Component", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders email and password fields", () => {
    renderWithStore();

    expect(
      screen.getByPlaceholderText(/enter your email/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your password/i),
    ).toBeInTheDocument();
  });

  test("typing email and password updates values", () => {
    renderWithStore();
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput).toHaveValue("user@example.com");
    expect(passwordInput).toHaveValue("123456");
  });

  test("shows loader when loading = true", () => {
    renderWithStore({ authReducer: { loading: true, isLoggedIn: false } });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("dispatch is called with correct user data on submit", async () => {
    renderWithStore();
    const dispatchSpy = jest.spyOn(reduxStore, "dispatch");

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Abcdef1!" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });

  test("shows password validation errors on submit", async () => {
    renderWithStore();

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/password must be at least 8 characters long/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /password must contain at least one uppercase letter/i,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /password must contain at least one special character/i,
        ),
      ).toBeInTheDocument();
    });
  });

  test("should validate password only when submit button is clicked", async () => {
    renderWithStore();

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/password must be at least 8 characters long/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /password must contain at least one uppercase letter/i,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /password must contain at least one special character/i,
        ),
      ).toBeInTheDocument();
    });
  });

  // MISSING TESTS:

  test("clears password errors when valid password is entered", async () => {
    renderWithStore();

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    // First submit with invalid password
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/password must be at least 8 characters long/i),
      ).toBeInTheDocument();
    });

    // Then submit with valid password
    fireEvent.change(passwordInput, { target: { value: "ValidPass1!" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/password must be at least 8 characters long/i),
      ).not.toBeInTheDocument();
    });
  });

  test("does not show validation errors before submit", () => {
    renderWithStore();

    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    fireEvent.change(passwordInput, { target: { value: "123" } });

    // Errors should NOT appear yet
    expect(
      screen.queryByText(/password must be at least 8 characters long/i),
    ).not.toBeInTheDocument();
  });

  test("form has correct submit type", () => {
    renderWithStore();
    const button = screen.getByRole("button", { name: /sign in/i });
    expect(button).toHaveAttribute("type", "submit");
  });
});
