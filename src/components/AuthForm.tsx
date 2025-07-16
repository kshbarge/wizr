import { useState, useContext, type FC, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";
import { getUsers } from "../../API.ts";
import Swal from "sweetalert2";

interface User {
  username: string;
  password: string;
  name: string;
  email: string;
  DOB: string;
  avatar_img_url?: string;
  language?: string;
  timezone?: string;
  skills?: string[];
  learning?: string[];
  isOnline?: boolean;
}

const newUser = {
  username: "",
  password: "",
  name: "",
  email: "",
  DOB: "",
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const AuthForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const isValidEmail = emailRegex.test(email);
  const isValidPassword = passwordRegex.test(password);
  const navigate = useNavigate();
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("No context");
  }

  const [, setUserContext] = context;

  const handleEmail = async (): Promise<void> => {
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
      showConfirmButton: false,
    });

    try {
      const allUsers: User[] = await getUsers();
      const existingUser = allUsers.find((user) => user.email === email);

      Swal.close();

      if (existingUser) {
        setIsRegistered(true);
        setDisplayForm(false);

        await Swal.fire({
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
        newUser.email = email;
        setIsRegistered(false);
        setDisplayForm(true);

        await Swal.fire({
          position: "top-end",
          icon: "info",
          iconColor: "#fdd673",
          title: "Email not found",
          text: "Please, try again or fill the registration form.",
          customClass: {
            popup: "swal-popup swal-popup--error",
            title: "swal-title",
            confirmButton: "swal-button",
          },
        });
      }
    } catch (error) {
      Swal.close();

      console.error("Error", error);

      Swal.fire({
        position: "top-end",
        icon: "error",
        iconColor: "#fdd673",
        title: "Fetching error",
        text: "Unable to verify the email. Please, try again later.",
        customClass: {
          popup: "swal-popup swal-popup swal-popup--error",
          title: "swal-title",
          confirmButton: "swal-button",
        },
      });
    }
  };

  const handleRegistration = async (event: FormEvent): Promise<void> => {
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
      newUser.username = username;
      newUser.name = fullname;
      newUser.DOB = dateOfBirth;
      newUser.password = password;
      setUserContext({ username: newUser.username });

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

  const handlePassword = async (): Promise<void> => {
    Swal.fire({
      position: "top-end",
      title: "Verifying password...",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
      },
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    const allUsers: User[] = await getUsers();
    const existingUser = allUsers.find((user) => user.email === email);

    if (existingUser?.password === password) {
      setUserContext(existingUser);

      await Swal.fire({
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

      navigate("/profile");
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
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label htmlFor="fullname">Full name:</label>
          <input
            id="fullname"
            type="text"
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
            required
          />
          <label htmlFor="date-of-birth">Date of Birth:</label>
          <input
            id="date-of-birth"
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            title="Password must contain at least six characters with a mix of letters and numbers"
            placeholder="Hover on this for a password hint"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button
            type="submit"
            disabled={
              !username ||
              !fullname ||
              !dateOfBirth ||
              !password ||
              !isValidPassword
            }
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
