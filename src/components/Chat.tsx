import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:9628");

function Chat() {
  const [input, setInput] = useState("");
  const [messageData, setMessageData] = useState([
    { body: "Welcome to the chat window!" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      socket.emit("newMessage", { message: input });
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("message", (data: any) => {
      setMessageData((prev) => [...prev, { body: data.message }]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="chat-box">
      <h2>User chat</h2>
      <section className="chat-messages">
        {messageData.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg.body}
          </div>
        ))}
      </section>
      <section>
        <form className="chat-form" onSubmit={handleSubmit}>
          <label htmlFor="messageInput">Message:</label>
          <textarea
            id="messageInput"
            placeholder="Type message here..."
            value={input}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}

export default Chat;
