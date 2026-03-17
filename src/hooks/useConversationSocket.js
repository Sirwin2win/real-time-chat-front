import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socket from "../socket/socket";
import {
  addConversationRealtime,
  setTypingUser,
  removeTypingUser,
} from "../features/conversations/conversationSlice";

const useConversationSocket = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    if (!socket.connected) socket.connect();

    socket.emit("joinRoom", userId);

    // 🟢 New conversation
    socket.on("newConversation", (conversation) => {
      dispatch(addConversationRealtime(conversation));
    });

    // ✍️ Typing
    socket.on("typing", ({ conversationId, user }) => {
      dispatch(setTypingUser({ conversationId, user }));
    });

    socket.on("stopTyping", ({ conversationId, user }) => {
      dispatch(removeTypingUser({ conversationId, user }));
    });

    return () => {
      socket.off("newConversation");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [userId, dispatch]);
};

export default useConversationSocket;