import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import Skills from "../components/Skills";
import "../styles/ProfilePage.css";
import { getUserByEmail, patchUserByEmail } from "../Api";

function ProfilePage() {
    const [avatar, setAvatar] = useState("https://picsum.photos/200");
    const [fullname, setFullname] = useState("John Doe");
    const [username, setUsername] = useState("Johnyfredo");
    const [bio, setBio]=  useState("Describe a little about yourself...");
    const [skillToTeach, setSkillToTeach] = useState("Japanese");
    const [skillToLearn, setSkillToLearn] = useState("German");

    const handleSave = ( 
      newAvatar: string,
      newFullame: string,
      newUsername: string,
      newBio: string 
      ) => {
        setAvatar(newAvatar);
        setFullname(newFullame);
        setUsername(newUsername);
        setBio(newBio)   
    };

  const handleSkillSave = (
    newSkillToTeach: string,
    newSkillToLearn: string
  ) => {
    setSkillToTeach(newSkillToTeach);
    setSkillToLearn(newSkillToLearn);
  };

  return (
    <div className="profile-section">
      <h2>Your Profile</h2>
      <UserCard
        avatar={avatar}
        fullname={fullname}
        username={username}
        bio={bio}
        setAvatar={setAvatar}
        setFullname={setFullname}
        setUsername={setUsername}
        setBio={setBio}
        onSave={handleSave}
      />
      <Skills
        skillToTeach={skillToTeach}
        skillToLearn={skillToLearn}
        onSave={handleSkillSave}
      />
    </div>
  );
}

export default ProfilePage;
