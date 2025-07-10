import { useEffect } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Mock data - to be replaced

function UserCard() {
  const handleMatch = () => {
    console.log("Match process started");

    socket.emit("startMatch", { userId: 1, skill: "guitar" }); // Mock data - to be replaced
  };

  return (
    <div>
      <button onClick={handleMatch}>Find a Match</button>
    </div>
  );
}

export default UserCard;
