import { io } from "socket.io-client";

const SOCKET_URL = "https://real-time-chat-back.onrender.com";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // control connection manually
});

export default socket;