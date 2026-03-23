import React from 'react'
import useConversationSocket from '../hooks/useConversationSocket'
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Chat = () => {
  const {accessToken} = useSelector((state) => state.auth);

  const decoded = jwtDecode(accessToken);
console.log(decoded)

  // useConversationSocket(userId);
  return (
    <div>Chat</div>
  )
}

export default Chat