import React from "react";
import { useNavigate } from "react-router-dom";
import FullLeftArrow from "../../assets/components/FullLeftArrow";
import Card from "../../common/Card";
import useSendPasswordResetEmail from "../../hooks/useSendPasswordResetEmail";
import { LOGIN_PAGE } from "../../utils/constants";

const SendPasswordReset = () => {
  const navigate = useNavigate();
  const { mutate } = useSendPasswordResetEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
    };

    const username: string = target.username.value;
    if (!username || username.length == 0) {
      // TODO: Error
      alert("Username can't be empty");
      return;
    }

    mutate(target.username.value);
  };

  return (
    <div className="flex flex-col lg:justify-center lg:items-center lg:w-full lg:h-screen">
      <Card customStyles="items-center w-full lg:w-1/4 h-fit p-7">
        <h1 className="mr-auto text-3xl font-bold">Reset Password</h1>
        <h2 className="mt-5 text-lg">
          Enter your username to receive instructions on how to reset your
          password
        </h2>

        <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
          <div className="mt-7">
            <label className="font-semibold text-slate-500">Username</label>
            <input
              type="text"
              name="username"
              className="font-semibold mt-1 p-1 border-2 border-slate-500 focus:outline-none focus:border-theme-cta rounded-lg w-full"
            />

            <input
              className="mt-5 w-full bg-theme-cta rounded-lg text-white font-bold px-3 py-2 hover:brightness-75 hover:cursor-pointer hover:"
              type="submit"
              value="Send instructions"
            />
          </div>

          <div
            className="flex flex-row justify-center items-center mt-5 mr-7"
            onClick={() => navigate(LOGIN_PAGE)}
          >
            <FullLeftArrow className="w-10 h-10 mt-1 mr-3" />
            <h1 className="font-semibold hover:text-slate-600 hover:cursor-pointer">
              Back to Login Page
            </h1>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SendPasswordReset;
