import { FC } from "react";
import useLogin from "../hooks/useLogin";
import { UserFormData } from "../utils/types";

const LoginForm: FC = () => {
  const {mutate: login} = useLogin();

  const parseFormData = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate Form data
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const formData: UserFormData = {
      username: target.username.value,
      password: target.password.value,
    }

    login(formData);  
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={ (e: React.FormEvent) => parseFormData(e) }>
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

export default LoginForm;