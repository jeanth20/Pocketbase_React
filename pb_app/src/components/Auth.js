import pb from "../lib/pocketbase";
import { useForm } from "react-hook-form";
import useLogout from "../hooks/useLogout";
import useLogin from "../hooks/useLogin";
import useVerified, { requestVerification } from "../hooks/useVerified";

export default function Auth() {
  const {login, isLoading} = useLogin();
  const { data: isVerified } = useVerified();
  const logout = useLogout();
  const { register, handleSubmit, reset } = useForm();

  const isLoggedIn = pb.authStore.isValid;

  async function onSubmit(data) {
    login(data.email, data.password);
    reset();
  }

  if (isLoggedIn)
    return (
      <>
        <h1>Logged In: {pb.authStore.model.email}</h1>
        <h4>Verified: {isVerified}</h4>
        {isVerified}
        { !isVerified && <button onClick={requestVerification}>Verification email</button>}
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
