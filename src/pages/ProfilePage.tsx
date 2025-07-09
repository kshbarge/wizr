
import { useState } from "react";
import UserCard from "../components/UserCard"; 
import Skills from "../components/Skills";

function ProfilePage() {

    const [username, setUsername] = useState("coolJmessy");
    const [avatar, setAvatar] = useState("https://example.com/avatar.png");
    const [skillToTeach, setSkillToTeach] = useState("Japanese");
    const [skillToLearn, setSkillToLearn] = useState("German");

    const handleSave = ( newUsername: string, newAvatar: string) => {
        console.log ("submitted",  newUsername, newAvatar);
        setUsername(newUsername);
        setAvatar(newAvatar);
    };

     const handleSkillSave = ( newSkillToTeach: string, newSkillToLearn: string) => {
        console.log ("submitted Skill",  newSkillToTeach, newSkillToLearn);
        setSkillToTeach(newSkillToTeach);
        setSkillToLearn(newSkillToLearn);
    };

    return (
        <div className="profile-section">
            <h2>Your Profile</h2>
            <UserCard
            username={username}
            avatar={avatar}
            setUsername={setUsername}
            setAvatar={setAvatar}
            onSave={handleSave}/>
            <Skills
            skillToTeach={skillToTeach}
            skillToLearn={skillToLearn}
            onSave={handleSkillSave}/>
        </div>
    );
}

export default ProfilePage;
