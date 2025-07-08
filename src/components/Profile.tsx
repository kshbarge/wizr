import { useState } from "react";
import UserCard from "./UserCard";

function Profile() {
    const [username, setUsername] = useState("coolJmessy");
    const [avatar, setAvatar] = useState("https://example.com/avatar.png");

    const handleSave = ( newUsername: string, newAvatar: string) => {
        console.log ("submitted",  newUsername, newAvatar);
        setUsername(newUsername);
        setAvatar(newAvatar);
    };

    return (
        <div>
            <h2>Your Profile</h2>
            <UserCard
            username={username}
            avatar={avatar}
            setUsername={setUsername}
            setAvatar={setAvatar}
            onSave={handleSave}
            />
        </div>
    );
}
export default Profile