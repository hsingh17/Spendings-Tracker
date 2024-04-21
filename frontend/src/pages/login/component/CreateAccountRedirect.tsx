import { CREATE_ACCT_PAGE } from "../../../utils/constants";

const CreateAccountRedirect = () => {
  return (
    <p
      className="mr-auto mt-5 underline hover:cursor-pointer hover:text-theme-cta font-semibold"
      onClick={() => alert(CREATE_ACCT_PAGE)}
    >
      Create an account
    </p>
  );
};

export default CreateAccountRedirect;
