import { useNavigate } from "react-router-dom";
import { CREATE_ACCT_PAGE } from "../../../utils/constants";

const CreateAccountRedirect = () => {
  const navigate = useNavigate();
  return (
    <p
      className="mr-auto mt-5 underline hover:cursor-pointer hover:text-theme-cta font-semibold"
      onClick={() => navigate(CREATE_ACCT_PAGE)}
    >
      Create an account
    </p>
  );
};

export default CreateAccountRedirect;
