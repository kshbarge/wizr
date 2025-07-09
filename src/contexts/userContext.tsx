import React, { createContext, useState, type ReactNode } from "react";

interface User {
  username: string;
}

type UserContextType = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>
];

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
