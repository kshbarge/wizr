import { useState, useEffect, useRef } from "react";
import Peer from 'simple-peer';
import io from 'socket.io-client'
import Chat from "./Chat";

const socket = io.connect("http://localhost:9811")

function Video() {
  const [stream, setStream] = useState();
  const [muted, setMuted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false)

  const [me, setMe] = useState("")
  const [receivingCall, setReceivingCall] = useState(false)
  const [caller, setCaller] = useState("")
  const [callerSignal, setCallerSignal] = useState()
  const [callAccepted, setCallAccepted] = useState(false)
  const [idToCall, setIdToCall] = useState("")
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState("")

  const mediaStreamConstraints = {
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video: true,
  };

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      })
      .catch((error) => {
        console.log(error);
      })

      socket.on('me', (id) => {
        setMe(id)
      })

      socket.on("callUser", (data) => {
        setReceivingCall(true)
        setCaller(data.from)
        setName(data.name)
        setCallerSignal(data.signal)
      })

  }, []);

  const callUser = (id) => {
    const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream
    })

    peer.on("signal", (data) => {
        socket.emit("callUser", {
            userToCall: id,
            signalData: data,
            from: me,
            name: name
        })
    })

    peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream
    })

    socket.on("callAccepted", (signal) => {
        setCallAccepted(true)
        peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream
    })

    peer.on("signal", (data) => {
        socket.emit("answerCall", {signal: data, to: caller})
    })

    peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
  }

  function handleClick() {
    if (isChatOpen) {
        setIsChatOpen(false)
    } else {
        setIsChatOpen(true)
    }
  }

  return (
    <>
      <h2>Video Chat</h2>
      <div>
        <section>
          <h3>Local</h3>
          {stream && <video playsInline ref={myVideo} autoPlay muted />}
        </section>
        <section>
          <h3>Remote</h3>
          {callAccepted && !callEnded ? <video playsInline ref={userVideo} autoPlay/> : null}
        </section>
      </div>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)}/>
        <p>My ID: {me}</p>
        <input value={idToCall} onChange={(e) => setIdToCall(e.target.value)}/>
        {callAccepted && !callEnded ? <button onClick={leaveCall}>End Call</button> : <button aria-label="call" onClick={() => callUser(idToCall)}>Start call</button>}
		{idToCall}
        {receivingCall && !callAccepted ? (
			<>
				<h1 >{name} is calling...</h1>
				<button onClick={answerCall}>Answer</button>
			</>
			) : null}
      </div>
      <button onClick={handleClick}>{isChatOpen ? "Close chat" : "View chat"}</button>
      {isChatOpen ? <Chat/> : ""}
    </>
  );
}

export default Video;
