import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../types/User";

type UserContextType = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>
];

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const currentUser = localStorage.getItem("user");
    return currentUser ? JSON.parse(currentUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (user?.username && !user._id) {
      fetch("https://wizr-z1na.onrender.com/users")
        .then((res) => res.json())
        .then((data) => {
          const fullUser = data.find((u: any) => u.username === user.username);
          if (fullUser) setUser(fullUser);
        })
        .catch((err) => {
          console.error("User fetch failed:", err);
        });
    }
  }, [user?.username]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
