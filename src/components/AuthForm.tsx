import { useState, type FC } from "react";
import Swal from "sweetalert2";

const API = { email: "john@doe.com", password: "JohnDoe" };

// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AuthForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  // const isValidEmail = emailRegex.test(email);

  const handleClick = (): void => {
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

  return (
    <form className="auth-form">
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        placeholder="Enter your email to login or sign up"
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <button type="button" onClick={handleClick}>
        Next
      </button>

      {isRegistered && (
        <div className="password-field">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" required />
          <button type="button" onClick={() => console.log("registered")}>
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
