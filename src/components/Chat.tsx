import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:9628");

function Chat() {
  const [input, setInput] = useState("");
  const [messageData, setMessageData] = useState([
    { body: "Welcome to the chat window!" },
  ]);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("newMessage", { message: input });
  }

  useEffect(() => {
    socket.on("message", (data) => {
      setMessageData((pastMessages) => [
        ...pastMessages,
        { body: data.message },
      ]);
    });
  }, [socket]);

  return (
    <>
      <h2>User chat</h2>
      <section>
        {messageData.map((msg, index) => (
          <div key={index}>{msg.body}</div>
        ))}
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="messageInput">Message:</label>
          <textarea
            id="messageInput"
            placeholder="Type message here..."
            onChange={handleInputChange}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    </>
  );
}

export default Chat;
