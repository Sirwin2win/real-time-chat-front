// src/components/Conversations.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setConversations, setSelectedConversation } from "../store/slices/chatSlice";

export default function Conversations({ userId }) {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/conversations/${userId}`)
      .then((res) => dispatch(setConversations(res.data)))
      .catch((err) => console.error(err));
  }, [userId, dispatch]);

  return (
    <div>
      <h3>Conversations</h3>
      <ul>
        {conversations.map((conv) => (
          <li
            key={conv._id}
            onClick={() => dispatch(setSelectedConversation(conv))}
            style={{ cursor: "pointer" }}
          >
            {conv.isGroup ? conv.groupName : conv.participants.map((p) => p.username).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}