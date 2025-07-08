import React from "react";

interface UserCardProps {
    username: string;
    avatar: string;
    setUsername: (value: string) => void;
    setAvatar: (value: string) => void;
    onSave?: (username:string, avatar:string) => void;
}

function UserCard({
    username,
    avatar,
    setUsername,
    setAvatar,
    onSave
}: UserCardProps){
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSave) {
            onSave(username, avatar);
        }
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const file = event.target.files?.[0];
        if (file){
            const imageURL= URL.createObjectURL(file);
            setAvatar(imageURL)
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                  type= "text"
                  value={username}
                  onChange={(event)=> setUsername(event.target.value)}
                />
            </label>
             <label>
                Change Avatar:
                <input
                  type= "file"
                  accept="image/*"
                  onChange={handleImageChange}/>
            </label>

            {avatar && (
            <img 
              src={avatar} 
              alt="avatar"/>
            )}
            <button type="submit">Save</button>
        </form>
    )
}


export default UserCard
