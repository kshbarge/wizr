import { useEffect, useContext } from "react";
import UserContext from "../contexts/userContext";

interface JitsiMeetExternalAPIConstructor {
  new (
    domain: string,
    options: JitsiMeetExternalAPIOptions
  ): JitsiMeetExternalAPIInstance;
}

interface JitsiMeetExternalAPIOptions {
  roomName: string;
  width: string | number;
  height: string | number;
  parentNode: HTMLElement | null;
  configOverwrite?: Record<string, unknown>;
  interfaceConfigOverwrite?: Record<string, unknown>;
  userInfo?: {
    displayName?: string;
  };
}

interface JitsiMeetExternalAPIInstance {
  addEventListener: (event: string, callback: () => void) => void;
  dispose: () => void;
}

function SessionPage() {
  const context = useContext(UserContext);
  if (!context) throw new Error("No context");

  const [user] = context;

  useEffect(() => {
    const domain = "meet.jit.si";
    const roomName =
      "KnowledgeIsPower_" +
      (user?.username || "Guest") +
      "_" +
      Math.floor(Math.random() * 100000);

    const options: JitsiMeetExternalAPIOptions = {
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

    const JitsiAPI = (
      window as unknown as {
        JitsiMeetExternalAPI: JitsiMeetExternalAPIConstructor;
      }
    ).JitsiMeetExternalAPI;

    const api = new JitsiAPI(domain, options);

    api.addEventListener("videoConferenceJoined", () => {
      console.log("Joined room as", user?.username);
    });

    return () => api.dispose();
  }, [user]);

  return (
    <>
      <h2>Welcome to your Knowledge is Power session page:</h2>
      <div id="jitsi-container" style={{ height: "80vh", width: "100%" }} />
    </>
  );
}

export default SessionPage;
