import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/UseAuth";

const LogIn = () => {
  const [username, setusername] = useState("");
  const [pass, setPass] = useState("");

  const { login, googleLogin } = useAuth();

  localStorage.removeItem("token");
  localStorage.removeItem("googleAuth");

  const navigate = useNavigate();

  const nav = () => {
    navigate("/admin/uploadTodo");
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const user = {
      username,
      pass,
    };
    await login(user, nav);
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
    await nav();
  };

  return (
    <div className="flex justify-center items-center w-full h-full flex-col">
      <h2 className="text-3xl py-10">Login</h2>
      <form className="flex flex-col" onSubmit={handleLogIn}>
        <input
          className=" outline-none border-b-2 py-2 my-2"
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
        <input
          className=" outline-none border-b-2 py-2 my-2"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button
          className="border-2 border-black px-4 py-2 mt-5 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="border-2 border-black px-4 py-2 mt-5 rounded"
      >
        Login with Google
      </button>
    </div>
  );
};

export default LogIn;
