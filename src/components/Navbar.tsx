import { useContext, type FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../contexts/userContext";

const Navbar: FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("No context");
  }

  const [user, setUser] = context;

  const handleLogout = (): void => {
    Swal.fire({
      position: "top-end",
      title: "Logging out...",
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
      setUser(null);

      Swal.fire({
        position: "top-end",
        icon: "success",
        iconColor: "#fdd673",
        title: "Logout successful!",
        text: "Redirecting to the login page...",
        customClass: {
          popup: "swal-popup swal-popup--success",
          title: "swal-title",
          confirmButton: "swal-button",
        },
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 1500);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/session">Session</NavLink>
        </li>
        {user && <li>Welcome, {user.username}!</li>}
      </ul>
      {user && (
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
