import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { runGermanQuiz } from "../utils/quiz";
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
  const navigate = useNavigate();

  const skills = ["French", "English", "Japanese", "German"];

   useEffect(() => {
    setSelectedSkillToTeach(skillToTeach);
    setSelectedSkillToLearn(skillToLearn);
  }, [skillToTeach, skillToLearn]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSave) {
      onSave(selectedSkillToTeach, selectedSkillToLearn);
    }
    setEditing(false);
  };

  const handleMatch = async () => {
    try {
      await Swal.fire({
        icon: "question",
        iconColor: "#fdd673",
        title: "Ready?",
        text: "You're about to learn some great stuff and teach what you really love!",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          timerProgressBar: "swal-bar",
        },
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
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          timerProgressBar: "swal-bar",
        },
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
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          timerProgressBar: "swal-bar",
        },
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      socket.emit("startMatch", {
        userId: 1,
        skillToTeach: selectedSkillToTeach,
        skillToLearn: selectedSkillToLearn,
      });

      if (
        selectedSkillToLearn === "Japanese" &&
        selectedSkillToTeach === "German"
      ) {
        await Swal.fire({
          icon: "success",
          iconColor: "#fdd673",
          title: "Match found!",
          text: "Redirecting to your session...",
          customClass: {
            popup: "swal-popup swal-popup--success",
            title: "swal-title",
            loader: "swal-loader",
          },
          timer: 3000,
          showConfirmButton: false,
        });

        navigate("/session");
      } else {
        const result = await Swal.fire({
          icon: "error",
          iconColor: "#fdd673",
          title: "No match found!",
          text: "Please, try again later or try our quiz!",
          customClass: {
            popup: "swal-popup swal-popup--error",
            title: "swal-title",
            confirmButton: "swal-button",
            denyButton: "swal-button",
          },
          showDenyButton: true,
          confirmButtonText: "Play quiz",
          denyButtonText: "Try again",
        });

        if (result.isConfirmed) {
          runGermanQuiz();
        } else if (result.isDenied) {
          handleMatch();
        }
      }
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        iconColor: "#fdd673",
        title: "Sorry!",
        text: "Something went wrong.",
        customClass: {
          popup: "swal-popup swal-popup--error",
          title: "swal-title",
          confirmButton: "swal-button",
        },
        confirmButtonText: "Back",
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
