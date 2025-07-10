import { useEffect, useContext } from "react";
import UserContext from "../contexts/userContext";

function SessionPage() {
  const context = useContext(UserContext);

  if (!context) throw new Error("No context");

  const [user] = context;

  useEffect(() => {
    const domain = "meet.jit.si";
    const roomName = "KnowledgeIsPower_" + Math.floor(Math.random() * 100000);

    const options = {
      roomName,
      width: "100%",
      height: "100%",
      parentNode: document.getElementById("jitsi-container"),
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        prejoinPageEnabled: false,
      },
      interfaceConfigOverwrite: {
        filmStripOnly: false,
      },
      userInfo: {
        displayName: user?.username || "Guest",
      },
    };

    const API = new window.JitsiMeetExternalAPI(domain, options);

    API.addEventListener("videoConferenceJoined", () => {
      console.log("Joined room as", user?.username);
    });

    return () => API.dispose();
  }, [user]);

  return (
    <>
      <h2>Welcome to your Knowledge is Power session page:</h2>
      <div id="jitsi-container" style={{ height: "80vh" }} />
    </>
  );
}

export default SessionPage;
