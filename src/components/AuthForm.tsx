import { useState, type FC } from "react";
import Swal from "sweetalert2";

const API = { email: "john@doe.com", password: "JohnDoe" };

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AuthForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const isValidEmail = emailRegex.test(email);

  const [password, setPassword] = useState<string>("");

  const handleEmailClick = (): void => {
    Swal.fire({
      position: "top-end",
      title: "Verifying email...",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        loader: "swal-loading",
      },
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    setTimeout(() => {
      if (email === API.email) {
        setIsRegistered(true);
        setDisplayForm(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          iconColor: "#fdd673",
          title: "Welcome back!",
          text: "Please, enter your password.",
          customClass: {
            popup: "swal-popup",
            title: "swal-title",
            confirmButton: "swal-button",
          },
        });
      } else {
        setIsRegistered(false);
        setDisplayForm(true);
        Swal.fire({
          position: "top-end",
          icon: "info",
          iconColor: "#fdd673",
          title: "Email not found",
          text: "Please, try again or fill the registration form.",
          customClass: {
            popup: "swal-popup",
            title: "swal-title",
            confirmButton: "swal-button",
          },
        });
      }
    }, 1500);
  };

  const handlePasswordClick = (): void => {
    Swal.fire({
      position: "top-end",
      title: "Verifying password...",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        loader: "swal-loading",
      },
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    setTimeout(() => {
      if (password === API.password) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          iconColor: "#fdd673",
          title: "Access granted!",
          text: "You have successfully logged in.",
          customClass: {
            popup: "swal-popup swal-popup--success",
            title: "swal-title",
            confirmButton: "swal-button",
          },
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          iconColor: "#fdd673",
          title: "Incorrect password",
          text: "Please, try again.",
          customClass: {
            popup: "swal-popup swal-popup--error",
            title: "swal-title",
            confirmButton: "swal-button",
          },
        });
      }
    }, 1500);
  };

  return (
    <form className="auth-form">
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        placeholder="Enter your email to login or sign up"
        onChange={(event) => setEmail(event.target.value)}
        disabled={isRegistered}
        required
      />
      <button
        type="button"
        onClick={handleEmailClick}
        disabled={!isValidEmail || isRegistered}
      >
        Next
      </button>

      {isRegistered && (
        <div className="password-field">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="button" onClick={handlePasswordClick}>
            Login
          </button>
        </div>
      )}

      {displayForm && (
        <div className="registration-field">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" required />
          <label htmlFor="fullname">Full name:</label>
          <input id="fullname" type="text" required />
          <label htmlFor="date-of-birth">Date of Birth:</label>
          <input id="date-of-birth" type="date" />
          <button type="button" onClick={() => console.log("not registered")}>
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
