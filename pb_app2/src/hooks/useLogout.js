import pb from "../lib/pocketbase";
import { useState } from "react";

export default function useLogout() {
  const [dummy, setDummy] = useState(0);

  function logout() {
    console.log("Logout")
    pb.authStore.clear();
    setDummy(Math.random());
  }

  return logout;
}
