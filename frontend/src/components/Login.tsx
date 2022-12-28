import { FormEvent, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { User } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // Custom inline type
    const target = e.target as typeof e.target & {
      username: { value : string };
      password: { value : string };
    };
    
    const postBody = {
      username: target.username.value,
      password: target.password.value
    };

    const apiUrl: string = Constants.BASE_URL + "/auth/login";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody),
      credentials: "include"
    });

    if (response.ok) {
      const user: User = await response.json() as User;
      setUser(user);
      navigate("/dashboard");
    } else {
      // TODO: Error handling
      console.log("LOGIN FAILED");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={ handleLogin }>
        <label>Username:</label>
        <br />
        <input type="text" name="username" /> 
        <br />
        <label>Password:</label>
        <br />
        <input type="password" name="password" />
        <br />
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
