import { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:9811");

function Video() {
  const [stream, setStream] = useState<MediaStream | any>();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [me, setMe] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<any>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      })
      .catch(console.error);

    socket.on("me", (id: string) => {
      setMe(id);
    });

    socket.on("callUser", (data: any) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const handleCamera = () => {
    console.log("Camera!");
    if (stream.getVideoTracks()[0].enabled) {
      stream.getVideoTracks()[0].enabled = false;
    } else {
      stream.getVideoTracks()[0].enabled = true;
    }
  };

  const handleMicrophone = () => {
    console.log("Mic!");
    if (stream.getAudioTracks()[0].enabled) {
      stream.getAudioTracks()[0].enabled = false;
    } else {
      stream.getAudioTracks()[0].enabled = true;
    }
  };

  return (
    <>
      <h2>Video Chat</h2>
      <div style={{ textAlign: "center", margin: "3rem auto" }}>
        My ID: {me}
      </div>
      <div className="video-wrapper">
        <section className="video-box">
          <h3>Local</h3>
          {stream && <video playsInline ref={myVideo} autoPlay muted />}
        </section>
        <section className="video-box">
          <h3>Remote</h3>
          {callAccepted && !callEnded ? (
            <video playsInline ref={userVideo} autoPlay />
          ) : (
            <h3>No remote video</h3>
          )}
        </section>
      </div>

      <div className="video-controls">
        <button onClick={handleCamera}>Toggle Camera</button>
        <button onClick={handleMicrophone}>Toggle Microphone</button>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="ID to call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>End Call</button>
        ) : (
          <button onClick={() => callUser(idToCall)}>Start Call</button>
        )}
      </div>

      {receivingCall && !callAccepted && (
        <div className="video-controls">
          <h3>{name} is calling...</h3>
          <button onClick={answerCall}>Answer</button>
        </div>
      )}

      <button
        style={{ display: "block", margin: "3rem auto" }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? "Close chat" : "View chat"}
      </button>
      {isChatOpen && <Chat />}
    </>
  );
}

export default Video;
