import { FC, useState } from "react";
import useLogin from "../hooks/useLogin";
import { UserFormData } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import Card from "./Card";
import QueryClientConfig from "../config/QueryClientConfig";
import toast from "react-hot-toast";
import { ReactComponent as ShowEye } from "../assets/raw/eye-show.svg";
import { ReactComponent as HideEye } from "../assets/raw/eye-hide.svg";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: login } = useLogin(
    () => {
      navigate(Constants.DASHBOARD_PAGE);
      QueryClientConfig.removeQueries(["user"]); // Invalidate the user key from cache so we get the new logged in user
    },
    () => {
      toast.error("Invalid login credentials!", {
        position: "bottom-center",
      });
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="relative mt-1 p-1 border-2 border-slate-500 focus:outline-none focus:border-theme-cta rounded-lg w-full"
              />
              {showPassword ? (
                <HideEye
                  onClick={() => setShowPassword(false)}
                  className="absolute top-0.5 right-2 w-10 h-10 scale-75 hover:cursor-pointer"
                />
              ) : (
                <ShowEye
                  onClick={() => setShowPassword(true)}
                  className="absolute top-0.5 right-2 w-10 h-10 scale-75 hover:cursor-pointer"
                />
              )}
            </div>
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
