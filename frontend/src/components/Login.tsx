import { FormEvent } from "react";

const Login = () => {
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

    const baseUrl: string = (import.meta.env.DEV ? import.meta.env.VITE_SERVER_BASE_URL : ""); 
    const fullUrl: string = baseUrl + "/auth/login";
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    });

    if (response.ok) {
      const responseBody = await response.json();
      console.log(responseBody);
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

  )
};

export default Login;
