import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Swal from "sweetalert2";
import UserContext from "../contexts/userContext";
import { runGermanQuiz } from "../utils/quiz";

const socket = io("http://localhost:3000");

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
  const navigate = useNavigate();
  const [user] = useContext(UserContext) || [];

  const skills = ["French", "English", "Japanese", "German"];

  useEffect(() => {
    setSelectedSkillToTeach(skillToTeach);
    setSelectedSkillToLearn(skillToLearn);
  }, [skillToTeach, skillToLearn]);

  useEffect(() => {
    socket.on("matchFound", (data) => {
      console.log("✅ MATCH FOUND:", data);
      Swal.fire({
        icon: "success",
        iconColor: "#fdd673",
        title: "Match found!",
        text: "Redirecting to your session...",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/session");
      });
    });

    socket.on("matchNotFound", async (data) => {
      console.log("❌ NO MATCH:", data);
      const result = await Swal.fire({
        icon: "error",
        iconColor: "#fdd673",
        title: "No match found!",
        text: "Please, try again later or try our quiz!",
        showDenyButton: true,
        confirmButtonText: "Play quiz",
        denyButtonText: "Try again",
        customClass: {
          popup: "swal-popup swal-popup--error",
          title: "swal-title",
          confirmButton: "swal-button",
          denyButton: "swal-button",
        },
      });

      if (result.isConfirmed) {
        runGermanQuiz();
      } else if (result.isDenied) {
        handleMatch();
      }
    });

    return () => {
      socket.off("matchFound");
      socket.off("matchNotFound");
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSave) {
      onSave(selectedSkillToTeach, selectedSkillToLearn);
    }
    setEditing(false);
  };

  const handleMatch = async () => {
    try {
      if (user?.username) {
        socket.emit("userOnline", { username: user.username });
      }

      await Swal.fire({
        icon: "question",
        iconColor: "#fdd673",
        title: "Ready?",
        text: "You're about to learn some great stuff and teach what you really love!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      await Swal.fire({
        icon: "info",
        iconColor: "#fdd673",
        title: "Timing",
        text: "Do not forget to swap when the notification appears!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      await Swal.fire({
        icon: "warning",
        iconColor: "#fdd673",
        title: "A thoughtful place",
        text: "Please, respect each other!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      console.log("Sending startMatch socket with:", {
        userId: user._id,
        skillToTeach: selectedSkillToTeach,
        skillToLearn: selectedSkillToLearn,
      });

      socket.emit("startMatch", {
        userId: user._id,
        skillToTeach: selectedSkillToTeach,
        skillToLearn: selectedSkillToLearn,
      });
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        iconColor: "#fdd673",
        title: "Sorry!",
        text: "Something went wrong.",
        confirmButtonText: "Back",
        customClass: {
          popup: "swal-popup swal-popup--error",
          title: "swal-title",
          confirmButton: "swal-button",
        },
      });
    }
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

              <div className="button-group">
                <button className="button" type="submit">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="data">
                <h3>Teach: {selectedSkillToTeach || "None selected"}</h3>
                <h3>Learn: {selectedSkillToLearn || "None selected"}</h3>
              </div>
              <div className="button-group">
                <button className="button" onClick={() => setEditing(true)}>
                  Edit
                </button>
                <button
                  className="button"
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
