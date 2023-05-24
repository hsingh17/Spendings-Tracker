import { FC } from "react";
import { LoginFormProps } from "../utils/types";

const LoginForm: FC<LoginFormProps> = ({ parentSetFormData }) => {
  const parseFormData = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate Form data
  
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };  
    
    parentSetFormData({
      username: target.username.value,
      password: target.password.value
    });
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