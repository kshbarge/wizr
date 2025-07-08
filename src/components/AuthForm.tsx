import { useState } from "react";
import type { ChangeEvent, FC } from "react";

const API = { email: "john@doe.com" };

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AuthForm: FC = () => {
  const [email, setEmail] = useState<string>("");

  const isRegistered = email === API.email;
  const isValidEmail = emailRegex.test(email);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
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
        </div>
      )}
    </form>
  );
};

export default AuthForm;
