import { useState } from "react";
import type { ChangeEvent, FC } from "react";
import Swal from "sweetalert2";

const API = { email: "john@doe.com", password: "JohnDoe" };

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AuthForm: FC = () => {
  const [email, setEmail] = useState<string>("");

  const isRegistered = email === API.email;
  const isValidEmail = emailRegex.test(email);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(event);
    Swal.fire({
      icon: "success",
      title: "Welcome back!",
      text: "You are successfully logged in.",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        confirmButton: "swal-button",
      },
    });
  };

  const handleRegistration = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    console.log(event);
    Swal.fire({
      icon: "success",
      title: "Welcome!",
      text: "You are successfully registered.",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        confirmButton: "swal-button",
      },
    });
  };

  return (
    <form className="auth-form">
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        placeholder="Enter your email to login or sign up"
        onChange={handleEmailChange}
        required
      />

      {isRegistered && (
        <div className="password-field">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" required />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}

      {isValidEmail && !isRegistered && (
        <div className="registration-field">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" required />
          <label htmlFor="fullname">Full name:</label>
          <input id="fullname" type="text" required />
          <label htmlFor="date-of-birth">Date of Birth:</label>
          <input id="date-of-birth" type="date" />
          <button type="button" onClick={handleRegistration}>
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
