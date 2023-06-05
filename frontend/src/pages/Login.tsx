import { Suspense, useState } from "react";
import LoginForm from "../components/LoginForm";
import { LoginFormFormData, Nullable } from "../utils/types";
import LoginFormNavigate from "../components/LoginFormNavigate";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const [ formData, setFormData ] = useState<Nullable<LoginFormFormData>>(null);
  const parentSetFormData = (formData: Nullable<LoginFormFormData>) => setFormData(formData);

  return (
    <>
      { !formData 
        ? <LoginForm parentSetFormData={ parentSetFormData}/>  /* No form data so render the Login Form component */
        : <Suspense fallback= {<LoadingSpinner/>}> <LoginFormNavigate formData={formData}/></Suspense>
      }
    </>
  );
};

export default Login;
