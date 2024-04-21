import { useNavigate } from "react-router-dom";
import FullLeftArrow from "../../assets/components/FullLeftArrow";
import { LOGIN_PAGE } from "../../utils/constants";

const BackToLoginPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row justify-center items-center mt-5 mr-7 group hover:cursor-pointer"
      onClick={() => navigate(LOGIN_PAGE)}
    >
      <FullLeftArrow className="w-10 h-10 mt-1 mr-3 fill-black stroke-black group-hover:fill-theme-cta group-hover:stroke-theme-cta" />
      <h1 className="font-semibold group-hover:text-theme-cta">
        Back to Login Page
      </h1>
    </div>
  );
};
export default BackToLoginPage;
