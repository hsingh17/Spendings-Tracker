import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { LoginFormFormData, Nullable } from "../utils/types";
import LoginFormNavigate from "../components/LoginFormNavigate";

const Login = () => {
  const [ formData, setFormData ] = useState<Nullable<LoginFormFormData>>(null);
  const [ error, setError ] = useState<Nullable<string>>(null);

  const parentSetFormData = (formData: Nullable<LoginFormFormData>) => setFormData(formData);
  const parentSetError = (error: Nullable<string>) => setError(error);

  return (
    <div>
      { !formData 
        ? <LoginForm parentSetFormData={ parentSetFormData }/>  /* No form data so render the Login Form component */
        : <LoginFormNavigate parentSetFormData={ parentSetFormData } parentSetError={ parentSetError } formData={ formData }/> /* User has submitted the login form attempt to navigate to dashboard*/
      }
      
      { error && <h1>{error}</h1> /* TODO */ } 
    </div>
  );
};

export default Login;
