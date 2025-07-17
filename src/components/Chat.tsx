import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/userContext";
import io from "socket.io-client";

const socket = io("https://heroic-hotteok-38d31a.netlify.app/", {
  path: "/session/"
});

function Chat() {
  const [input, setInput] = useState("");
  const [messageData, setMessageData] = useState([
    { body: "Welcome to the chat window!", sentBy: "Room" },
  ]);

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("No context");
  }

  const [user] = context;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      socket.emit("newMessage", { message: input, sender: user?.username });
    }
  };

  useEffect(() => {
    socket.on("message", (data: any) => {
      setMessageData((pastMessages) => [
        ...pastMessages,
        { body: data.message, sentBy: data.sender },
      ]);
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
          <div
            key={index}
            className={
              msg.sentBy === user?.username
                ? "my-message chat-message"
                : msg.sentBy === "Room"
                ? "my-message room-message"
                : "my-message their-message"
            }
          >
            {msg.sentBy}: {msg.body}
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
