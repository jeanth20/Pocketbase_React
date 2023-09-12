import pb from "../lib/pocketbase";
import { useState } from "react";

export default function useLogin() {
  const [isLoading, setLoading] = useState(false);

  async function login(email, password){
    alert('login');
    setLoading(true);
    // console.log(email);
    // console.log(password);
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
