import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../types/globalState";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppDispatch } from "../../store/store";
import { logIn } from "../../store/auth/actions";
import { validatePassword } from "../../validators/passwordValidator";
import { useNavigate } from "react-router-dom";
import { AuthError } from "../../error-message/auth-error";

export const SignIn = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const loading =
    useSelector((state: GlobalState) => state.authReducer?.loading) || false;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validatePassword(password);

    if (!validation.valid) {
      setPasswordErrors(validation.errors);
      return;
    }

    setPasswordErrors([]);

    const userData = { email, password };

    const result = await dispatch(logIn(userData));

    // Check for USER_NOT_FOUND
    if (result?.payload?.includes(AuthError.USER_NOT_FOUND)) {
      toast.current?.show({
        severity: "warn",
        summary: "Account Not Found",
        detail:
          "No account exists with this email. Redirecting to registration...",
        life: 3000,
      });

      setTimeout(() => {
        navigate("/create_user");
      }, 3500);
    }
    // Check for INVALID_CREDENTIALS (separate condition)
    else if (result?.payload?.includes(AuthError.INVALID_CREDENTIALS)) {
      toast.current?.show({
        severity: "error",
        summary: "Invalid Credentials",
        detail: "The email or password you entered is incorrect.",
        life: 3000,
      });
    } else if (logIn.fulfilled.match(result)) {
      toast.current?.show({
        severity: "success",
        summary: "Login Successful",
        detail: "Welcome back!",
        life: 2000,
      });
    } else {
      toast.current?.show({
        severity: "success",
        summary: "Sucess",
        detail: "Welcome",
        life: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-content-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="flex justify-content-center">
      <Toast ref={toast} />
      <form onSubmit={onSubmit} className="p-fluid" style={{ width: "300px" }}>
        <h2 className="text-center">Sign In</h2>

        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="field" style={{ marginTop: "1rem" }}>
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            toggleMask
            feedback={false}
            required
            inputStyle={{ paddingRight: "2.5rem" }}
          />
          {passwordErrors.length > 0 && (
            <ul style={{ color: "red", marginTop: "0.5rem" }}>
              {passwordErrors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}
        </div>

        <Button
          type="submit"
          label="Sign In"
          className="p-mt-3 p-button-primary"
          style={{ width: "100%" }}
        />
      </form>
    </div>
  );
};
