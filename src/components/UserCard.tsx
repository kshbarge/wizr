import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

interface UserCardProps {
  username: string;
  avatar: string;
  setUsername: (value: string) => void;
  setAvatar: (value: string) => void;
  onSave?: (username: string, avatar: string) => void;
}

function UserCard({
  username,
  avatar,
  setUsername,
  setAvatar,
  onSave,
}: UserCardProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSave) {
      onSave(username, avatar);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);
    }
  };

  const handleMatch = () => {
    console.log("Match process started");
    socket.emit("startMatch", { userId: 1, skill: "guitar" });
  };

  return (
    <div className="card">
      <div className="imgBx">
        {avatar ? (
          <img src={avatar} alt="avatar" />
        ) : (
          <img
            src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
            alt="default avatar"
          />
        )}
      </div>

      <div className="content">
        <div className="details">
          <form onSubmit={handleSubmit}>
            <label className="hide-file-input">
              <h3>Choose Avatar</h3>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hide-file-input"
            />

            <label>
              <h3>Username</h3>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>

            <div className="actionBtn">
              <button type="submit">Save</button>
              <button type="button" onClick={handleMatch}>
                Find a Match
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserCard;