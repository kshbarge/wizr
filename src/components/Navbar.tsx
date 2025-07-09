import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/userContext";

function Navbar() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("No context");
  }

  const [user] = context;

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
        {user && <li>Username: {user.username}</li>}
      </ul>
    </nav>
  );
}

export default Navbar;
