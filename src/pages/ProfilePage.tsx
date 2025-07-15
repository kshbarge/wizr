import { useState, useEffect, useContext } from "react";
import UserCard from "../components/UserCard";
import Skills from "../components/Skills";
import "../styles/ProfilePage.css";
import UserContext from "../contexts/userContext";
import { updateUser } from "../../API";


function ProfilePage() {
    const context = useContext(UserContext);
    if(!context){
      throw new Error("No context")
    }

    const [user, setUser] = context;
    const [avatar, setAvatar] = useState("https://picsum.photos/200");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio]=  useState("Tell us a little about yourself...");
    const [skillToTeach, setSkillToTeach] = useState("");
    const [skillToLearn, setSkillToLearn] = useState("");

      useEffect(()=>{
      if (user) {
        setAvatar(user.avatar_img_url || "https://picsum.photos/200")
        setName(user.name || "")
        setUsername(user.username || "")
        setBio("Let us a little about yourself...");
        setSkillToTeach(user.skills?.[0] || "")
        setSkillToLearn(user.learning?.[0] || "")
      }
    }, [user])

    const handleSave = ( 
      newAvatar: string,
      newName: string,
      newUsername: string,
      newBio: string 
      ) => {
        setAvatar(newAvatar);
        setName(newName);
        setUsername(newUsername);
        setBio(newBio)   
    
     if(user) {
        updateUser(user.email, {
        username: newUsername,
        name: newName,
        avatar_img_url: newAvatar,
        bio: newBio,
      })
        .then((updatedUser) => setUser(updatedUser))
        .catch((err) => 
         console.error("Failed to update profile", err));
         }
    };

  const handleSkillSave = (teach: string, learn:string) => {
    setSkillToTeach(teach);
    setSkillToLearn(learn);

      if(user) {
      updateUser(user.email, {
        skills: [teach],
        learning: [learn],
      })
      .then((updatedUser) => setUser(updatedUser))
        .catch((err) => console.error("Failed to update skills", err));
    }
  };

  return (
    <div className="profile-section">
      <h2>Your Profile</h2>
      <UserCard
        avatar_img_url={avatar|| "https://picsum.photos/200"}
        name={name}
        username={username}
        bio={bio}
        setAvatar={setAvatar}
        setName={setName}
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
