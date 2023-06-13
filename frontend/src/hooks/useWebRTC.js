import { useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

const users = [
  {
    id: 1,
    name: "Ritesh Agarawal",
  },
  {
    id: 2,
    name: "Summit Shah",
  },
];
export const useWebRTC = () => {
  const [clients, setClients] = useStateWithCallback(users);

  return { clients };
};
