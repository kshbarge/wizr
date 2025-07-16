import { useEffect, useContext } from "react";
import Video from "../components/Video";
import Chat from "../components/Chat";
import UserContext from "../contexts/userContext";
import "../styles/SessionPage.css";
import Swal from "sweetalert2";

function SessionPage() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("No context");
  }

  const [user] = context;

  useEffect(() => {
    console.log("Session started for", user?.username);

    const lengthOfSessionInMins = 30;
    const timeLeftWarningInMins = 5;

    const timeUntilSessionWarning =
      (lengthOfSessionInMins - timeLeftWarningInMins) * 60 * 1000;
    const timeUntilSessionEnds = lengthOfSessionInMins * 60 * 1000;
    const fullLengthOfSessionInMins = 60;
    const endOfFullSession = fullLengthOfSessionInMins * 60 * 1000;

    const warningTimer = setTimeout(() => {
      Swal.fire({
        icon: "warning",
        title: "5 minutes remaining",
        text: "Your session will end in 5 minutes, get ready to swap over",
        iconColor: "#fdd673",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "swal-button",
        },
      });
    }, timeUntilSessionWarning);

    const endSessionTimer = setTimeout(() => {
      Swal.fire({
        icon: "info",
        title: "Time to swap",
        text: "Your turn has now ended, please swap over",
        iconColor: "#fdd673",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "swal-button",
        },
      });
    }, timeUntilSessionEnds);

    const fullEndTimer = setTimeout(() => {
      Swal.fire({
        icon: "info",
        title: "Session has ended",
        text: "The session has now ended",
        iconColor: "#fdd673",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "swal-button",
        },
      });
    }, endOfFullSession);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(endSessionTimer);
      clearTimeout(fullEndTimer);
    };
  }, [user]);

  return (
    <>
      <h2>Welcome to your Knowledge is Power session page:</h2>
      <p>Prepare for your upcoming session!</p>
      <Video />
      <Chat />
    </>
  );
}

export default SessionPage;
