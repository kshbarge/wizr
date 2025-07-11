import { useState, useContext, type FC, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";
import Swal from "sweetalert2";

const APIuser = {
  email: "john@doe.com",
  password: "JohnDoe",
  username: "John2000",
  fullname: "John Doe",
  dateOfBirth: "2000-07-01",
};

const APInewUser = {
  email: "",
  password: "",
  username: "",
  fullname: "",
  dateOfBirth: "",
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AuthForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const isValidEmail = emailRegex.test(email);
  const navigate = useNavigate();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("No context");
  }

  const [, setUser] = context;

  const handleEmail = (): void => {
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
      if (email === APIuser.email) {
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
        APInewUser.email = email;
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

  const handlePassword = (): void => {
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
      if (password === APIuser.password) {
        setUser({ username: APIuser.username });

        Swal.fire({
          position: "top-end",
          icon: "success",
          iconColor: "#fdd673",
          title: "Access granted!",
          text: "You have successfully logged in. Redirecting to your profile...",
          customClass: {
            popup: "swal-popup swal-popup--success",
            title: "swal-title",
          },
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
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

  const handleRegistration = (event: FormEvent): void => {
    event.preventDefault();

    Swal.fire({
      position: "top-end",
      title: "Registering...",
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
      APInewUser.username = username;
      APInewUser.fullname = fullname;
      APInewUser.dateOfBirth = dateOfBirth;
      APInewUser.password = password;
      setUser({ username: APInewUser.username });

      Swal.fire({
        position: "top-end",
        icon: "success",
        iconColor: "#fdd673",
        title: "Registration successful!",
        text: "Redirecting to your profile...",
        customClass: {
          popup: "swal-popup swal-popup--success",
          title: "swal-title",
          confirmButton: "swal-button",
        },
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    }, 1500);
  };

  return (
    <form className="auth-form" onSubmit={handleRegistration}>
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
        onClick={handleEmail}
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
          <button type="button" onClick={handlePassword}>
            Login
          </button>
        </div>
      )}

      {displayForm && (
        <div className="registration-field">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label htmlFor="fullname">Full name:</label>
          <input
            id="fullname"
            type="text"
            onChange={(event) => setFullname(event.target.value)}
            required
          />
          <label htmlFor="date-of-birth">Date of Birth:</label>
          <input
            id="date-of-birth"
            type="date"
            onChange={(event) => setDateOfBirth(event.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
