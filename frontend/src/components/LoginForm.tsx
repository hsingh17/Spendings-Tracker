import { FC } from "react";
import useLogin from "../hooks/useLogin";
import { UserFormData } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import Card from "./Card";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { mutate: login } = useLogin(() => navigate(Constants.DASHBOARD_PAGE));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate Form data
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const formData: UserFormData = {
      username: target.username.value,
      password: target.password.value,
    };

    login(formData);
  };

  return (
    <div className="flex flex-col lg:justify-center lg:items-center lg:w-full lg:h-screen">
      <Card
        itemsCenter={true}
        widthStyle={"w-full lg:w-2/6"}
        heightStyle={"h-1/2"}
      >
        <h1 className="mr-auto text-3xl font-bold">Log in</h1>
        <form
          className="w-full"
          onSubmit={(e: React.FormEvent) => handleSubmit(e)}
        >
          <div className="mt-5">
            <label className="font-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="mt-1 p-1 border-2 border-slate-500 focus:outline-none focus:border-theme-cta rounded-lg w-full"
            />
          </div>

          <div className="mt-5">
            <label className="flex flex-row font-semibold">
              <p>Password</p>
              <p
                className="ml-auto text-slate-500 hover:cursor-pointer"
                onClick={() => alert("TODO")}
              >
                Forgot password
              </p>
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 p-1 border-2 border-slate-500 focus:outline-none focus:border-theme-cta rounded-lg w-full"
            />
          </div>

          <input
            className="mt-5 w-full bg-theme-cta rounded-lg text-white font-bold px-3 py-2 hover:brightness-75 hover:cursor-pointer hover:"
            type="submit"
            value="Log in"
          />
        </form>
        <p
          className="mr-auto mt-5 underline hover:cursor-pointer hover:text-theme-cta font-semibold"
          onClick={() => alert("TODO")}
        >
          Create an account
        </p>
      </Card>
    </div>
  );
};

export default LoginForm;
