import { FormEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Constants } from "../utils/constants";
import makeFetchRequestWrapper from "../utils/fetch-wrapper";
import { User } from "../utils/types";
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
    const response = await makeFetchRequestWrapper<User>(apiUrl, "POST", JSON.stringify(requestBody));

    if (response.ok) {
      setUser(response.obj as User);
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
