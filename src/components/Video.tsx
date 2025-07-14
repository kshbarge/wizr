import { useState, useEffect, useRef } from "react";

function Video() {
  const [stream, setStream] = useState();
  const [muted, setMuted] = useState(false);

  const mediaStreamConstraints = {
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video: true,
  };

  const myVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((MediaStream) => {
        setStream(MediaStream);
        myVideo.current.srcObject = MediaStream;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          <video></video>
        </section>
      </div>
    </>
  );
}

export default Video;
