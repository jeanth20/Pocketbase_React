import pb from "../lib/pocketbase";
import { useState } from "react";
// import { useMutation } from "react-query";

export default function useLogin() {
  const [isLoading, setLoading] = useState(false);

  async function login(email, password){
    setLoading(true);
    try {
      const authData = await pb
      .collection('users')
      .authWithPassword(email, password);
    } catch (e) {
      console.log(e);
      alert(e)
    }
    setLoading(false);
  }

  return {login, isLoading};
}
