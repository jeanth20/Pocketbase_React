import useLogout from "./hooks/useLogout";
import useLogin from "./hooks/useLogin";
import pb from "./lib/pocketbase";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Auth() {

  const {login, isLoading} = useLogin();
  const logout = useLogout();
  const [dummy, setDummy] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  const isLoggedIn = pb.authStore.isValid;
  // const isLoggedIn = pb.authStore.isValid.toString();
  // const isUser = pb.authStore.model.user;

  async function onSubmit(data){
    login({email: data.email, password: data.password});
    reset();
  }

  if (isLoggedIn)
    return (
      <>
        <h1>Logged In: {pb.authStore.model.email}</h1>
        <button onClick={logout}>Logout</button>
      </>
    );


  return(
    <>
      {isLoading && <p>Loading</p>}
      <h1>Please Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="email" {...register('email')} />
        <input type="password" placeholder="password" {...register('password')} />
        <button type="submit" disable={isLoading}>{isLoading ? "Loading" : "Login"}</button>
      </form>
    </>
  );
}
