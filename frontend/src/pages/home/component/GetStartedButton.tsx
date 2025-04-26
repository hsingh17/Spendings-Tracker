import { useNavigate } from "react-router-dom";

const GetStartedButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="mt-5 w-fit bg-theme-cta rounded-3xl text-white px-7 py-4 text-lg font-semibold hover:brightness-90"
      onClick={() => navigate("/login")}
    >
      Get Started
    </button>
  );
};

export default GetStartedButton;
