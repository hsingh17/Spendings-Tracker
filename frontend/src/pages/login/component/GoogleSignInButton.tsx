import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

const GoogleSignInButton = () => {
  return (
    <div className="mt-3 w-full">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          shape="pill"
          theme="filled_black"
          type="standard"
          onSuccess={(credentialResponse: CredentialResponse) => {
            console.log(credentialResponse);
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSignInButton;
