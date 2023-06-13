import { io } from "socket.io-client";

export const socketInit = () => {
  const options = {
    "force new connection": true,
    reconnectAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  return io("http://localhost:5500", options);
};
