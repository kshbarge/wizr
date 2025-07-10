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
  const navigate = useNavigate();

  const skills = ["French", "English", "Japanese", "German"];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSave) {
      onSave(selectedSkillToTeach, selectedSkillToLearn);
    }
    setEditing(false);
  };

  const waitForMatch = () => {
    return new Promise<void>((resolve, reject) => {
      let matched = false;
      let tipIndex = 0;

      const tips = [
        "Looking for someone who fits...",
        "Remember to listen and share kindly!",
        "Almost there...",
        "Learning is a two-way exercise",
        "Knowledge is power!",
      ];

      const loopTip = async () => {
        if (matched) return;

        await Swal.fire({
          title: "Matching in progress...",
          text: `${tips[tipIndex]}`,
          customClass: {
            popup: "swal-popup",
            title: "swal-title",
            loader: "swal-loading",
          },
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => Swal.showLoading(),
          timer: 3000,
        });

        tipIndex = (tipIndex + 1) % tips.length;

        if (!matched) loopTip();
      };

      loopTip();

      socket.once("matchFound", () => {
        matched = true;
        resolve();
      });

      setTimeout(() => {
        if (!matched) {
          matched = true;
          reject(new Error("No match found"));
        }
      }, 10000);
    });
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

      await waitForMatch();

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
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        iconColor: "#fdd673",
        title: "Sorry!",
        text: "No match found. Please, try again later.",
        customClass: {
          popup: "swal-popup swal-popup--error",
          title: "swal-title",
          confirmButton: "swal-button",
        },
        confirmButtonText: "Okay",
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
