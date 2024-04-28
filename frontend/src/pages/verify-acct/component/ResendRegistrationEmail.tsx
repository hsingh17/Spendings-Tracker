import { FC } from "react";
import useResendRegistrationEmail from "../../../hooks/useResendRegistrationEmail";

type ResendRegistrationEmailProps = {
  username: string;
};

const ResendRegistrationEmail: FC<ResendRegistrationEmailProps> = ({
  username,
}) => {
  const { mutate: resendRegistrationEmail } =
    useResendRegistrationEmail(username);
  return (
    <button
      className="mt-3 w-full text-slate-400 font-bold px-3 py-2 hover:brightness-75 hover:cursor-pointer"
      onClick={() => resendRegistrationEmail()}
    >
      Resend registration email
    </button>
  );
};

export default ResendRegistrationEmail;
