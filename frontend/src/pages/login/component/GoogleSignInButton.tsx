import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import toast from "react-hot-toast";
import useLogin from "../../../hooks/useLogin";
import { ExternalUserType } from "../../../utils/types";

const GoogleSignInButton = () => {
  const { mutate: login } = useLogin(() => {
    toast.error("Invalid login credentials!", {
      position: "bottom-center",
    });
  }, ExternalUserType.GOOGLE);

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    login({ oAuthCredential: credentialResponse.credential });
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        shape="circle"
        theme="filled_blue"
        type="icon"
        onSuccess={(credentialResponse: CredentialResponse) =>
          handleGoogleLogin(credentialResponse)
        }
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;
