import { useState } from "react";

interface SkillProps {
    skillToLearn: string;
    skillToTeach: string;
    onSave?: (teach: string, learn: string) => void;
} 

function Skills({
    skillToTeach,
    skillToLearn,
    onSave
}: SkillProps) {
    const [editing, setEditing] = useState(false);
    const [selectedSkillToTeach, setSelectedSkillToTeach] = useState(skillToTeach);
    const [selectedSkillToLearn, setSelectedSkillToLearn] = useState(skillToLearn);

    const skills = [
        "French",
        "English",
        "Japanese",
        "German"
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (onSave) {
                onSave(selectedSkillToTeach, selectedSkillToLearn);
            }
            setEditing(false);
        };

        return (
            <div className="card">
             <div className="content">
              <div className="details">
              <h2>Skills</h2>
                {editing ? (
                  <form onSubmit={handleSubmit}>
                    <label>
                      Skill to Teach:
                       <select
                         value={selectedSkillToTeach}
                         onChange={(event)=> setSelectedSkillToTeach(event.target.value)}>
                         <option value=""> Select a skill </option>
                         {skills.map((skill) => (
                          <option key={skill} value={skill}>
                            {skill}
                          </option> 
                         ))}
                      </select>
                   </label>

                   <label>
                     Skill to Learn:
                     <select
                       value={selectedSkillToLearn}
                       onChange={(event)=> setSelectedSkillToLearn(event.target.value)}>
                       <option value=""> Select a skill </option>
                       {skills.map((skill) => (
                        <option key={skill} value={skill}>
                         {skill}
                       </option> 
                       ))}
                     </select>
                   </label>
                   <div className="actionBtn">
                    <button type="submit">Save</button>
                   </div>
                  </form>
                ) : (
                  <>
                  <div className="data">
                   <h3> 
                     Teach:{selectedSkillToTeach || "None selected" }
                   </h3>
                   <h3>
                     Learn:{selectedSkillToLearn || "None selected" }
                   </h3>
                  </div>
                  <div className="actionBtn">
                   <button onClick={() => setEditing(true)}>Edit</button>
                  </div>
                 </>
                )}
            </div>
          </div>
        </div>
        )

}
export default Skills