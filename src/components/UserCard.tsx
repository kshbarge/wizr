import React from "react";
import { useState } from "react";

interface UserCardProps {
    avatar_img_url: string;
    name: string;
    username: string;
    bio: string;
    setAvatar: (value: string) => void;
    setName: (value: string) => void;
    setUsername: (value: string) => void;
    setBio: (value: string) => void;
    onSave?: (avatar_img_url: string, name: string, username: string, bio: string) => void;
}

function UserCard({
    avatar_img_url,
    name,
    username,
    bio,
    setAvatar,
    setName,
    setUsername,
    setBio,
    onSave,
}: UserCardProps) {
  const [editing, setEditing] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSave) {
            onSave(avatar_img_url, name, username, bio );
        }
  };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);
        }
  };
    
    return ( 
       <div className="card">
        <div className="imgBx">
          <label htmlFor="avatar-upload">
          <img 
            src={avatar_img_url} 
            alt="avatar" 
            className="clickable-avatar"
            title="change"
            />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hide-file-input"
            />
            </label>
        </div>
        <div className="content">
        <div className="details">
             {!editing ? (
              <>
             <h2>{name}</h2>
             <h2>@{username}</h2>
             <p>{bio}</p>
             <div className= "button-group">
             <button className= "button" onClick={() => setEditing(true)}>Edit Profile</button>
             </div> 
             </>
             ) : (
             <form onSubmit={handleSubmit}>
             <label>
              Full Name
             <input
             type="text"
             value={name}
             onChange={(event) => setName(event.target.value)}
             />
            </label>
            <label>
             Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            </label>
            <label>
             Bio
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
            </label>
            <div className="button-group">
            <button className= "button" type="submit">Save</button>
            <button className= "button" type="button" onClick={() => setEditing(false)}>
              Cancel 
            </button>
            </div>
        </form>
        )}
       </div>
     </div>
    </div>
  );
}

export default UserCard;
