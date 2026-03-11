// src/components/ChatWindow.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../store/slices/chatSlice";
import { useSocket } from "../context/SocketContext";
import axios from "axios";

export default function ChatWindow({ userId }) {
  const dispatch = useDispatch();
  const socket = useSocket();
  const conversation = useSelector((state) => state.chat.selectedConversation);
  const messages = useSelector((state) => state.chat.messages);
  const [text, setText] = useState("");

  // Load messages
  useEffect(() => {
    if (!conversation) return;
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/messages/${conversation._id}`)
      .then((res) => dispatch(setMessages(res.data)))
      .catch((err) => console.error(err));

    socket?.emit("join", conversation._id);
  }, [conversation, socket, dispatch]);

  // Listen for socket messages
  useEffect(() => {
    if (!socket) return;
    const handler = (msg) => {
      if (msg.conversationId === conversation._id) {
        dispatch(addMessage(msg));
      }
    };
    socket.on("chat message", handler);
    return () => socket.off("chat message", handler);
  }, [socket, conversation, dispatch]);

  const sendMessage = () => {
    if (!text) return;
    const msg = {
      conversationId: conversation._id,
      sender: userId,
      text,
    };
    socket.emit("chat message", msg, (ack) => {
      if (ack.status !== "ok") console.error("Message failed:", ack.error);
    });
    dispatch(addMessage({ ...msg, _id: Date.now() })); // optimistic update
    setText("");
  };

  if (!conversation) return <div>Select a conversation</div>;

  return (
    <div>
      <h3>{conversation.isGroup ? conversation.groupName : "Chat"}</h3>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid gray" }}>
        {messages.map((msg) => (
          <div key={msg._id}>
            <b>{msg.sender.username || msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}