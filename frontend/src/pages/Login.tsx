import { FormEvent, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { User } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import isLoggedIn from "../utils/user-logged-in-helper";

const Login = () => {
  // TODO: check if user is already potentially logged in (JWT Token is in storage)
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // Custom inline type
    const target = e.target as typeof e.target & {
      username: { value: String };
      password: { value: String };
    };
    
    const requestBody = {
      username: target.username.value,
      password: target.password.value
    };

    const apiUrl: string = Constants.BASE_URL + "/auth/login";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
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

  useEffect(() => {
    isLoggedIn(user, setUser, navigate, "/dashboard", null);
  }, [])

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
