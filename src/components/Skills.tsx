import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Swal from "sweetalert2";

const socket = io("http://localhost:4000");

interface SkillProps {
  skillToLearn: string;
  skillToTeach: string;
  onSave?: (teach: string, learn: string) => void;
}

function Skills({ skillToTeach, skillToLearn, onSave }: SkillProps) {
  const [editing, setEditing] = useState(false);
  const [selectedSkillToTeach, setSelectedSkillToTeach] =
    useState(skillToTeach);
  const [selectedSkillToLearn, setSelectedSkillToLearn] =
    useState(skillToLearn);

  const skills = ["French", "English", "Japanese", "German"];
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSave) {
      onSave(selectedSkillToTeach, selectedSkillToLearn);
    }
    setEditing(false);
  };

  const handleMatch = () => {
    Swal.fire({
      position: "top-end",
      title: "Searching match...",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        loader: "swal-loading",
      },
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    setTimeout(() => {
      // Invia i dati al server
      socket.emit("startMatch", {
        userId: 1, // sostituisci con vero ID se disponibile
        skillToTeach: selectedSkillToTeach,
        skillToLearn: selectedSkillToLearn,
      });

      // Mostra conferma e redirect
      Swal.fire({
        position: "top-end",
        icon: "success",
        iconColor: "#fdd673",
        title: "Match found!",
        text: "You have successfully matched. Redirecting to your profile...",
        customClass: {
          popup: "swal-popup swal-popup--success",
          title: "swal-title",
        },
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/session");
      }, 1500);
    }, 2000); // Simula tempo di attesa per il match
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
                  onChange={(e) => setSelectedSkillToTeach(e.target.value)}
                >
                  <option value="">Select a skill</option>
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
                  onChange={(e) => setSelectedSkillToLearn(e.target.value)}
                >
                  <option value="">Select a skill</option>
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
                <h3>Teach: {selectedSkillToTeach || "None selected"}</h3>
                <h3>Learn: {selectedSkillToLearn || "None selected"}</h3>
              </div>
              <div className="actionBtn">
                <button onClick={() => setEditing(true)}>Edit</button>
                <button
                  onClick={handleMatch}
                  disabled={!selectedSkillToTeach || !selectedSkillToLearn}
                >
                  Find a Match
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Skills;
