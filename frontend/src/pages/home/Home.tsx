import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-gradient-to-r from-sky-200 via-slate-200 to-sky-200">
      <p>logo here</p>
      <div className="flex flex-col lg:flex-row justify-center items-center p-60 h-full">
        <div className="flex flex-col w-96 h-full mr-auto justify-center">
          <p className="lg:text-7xl mb-10 font-semibold">
            Organize Your Spendings.
          </p>
          <p className="mb-10 text-lg">
            Never lose track of your spendings again. Spendings Tracker will
            help you organize your spendings all in one place, all for free.
          </p>
          <button
            className="mt-5 w-fit bg-theme-cta rounded-3xl text-white px-7 py-4 text-lg font-semibold hover:brightness-90"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
        <div className="lg:w-[700px] h-full bg-red-500">CAROUSEL</div>
      </div>
    </div>
  );
  // https://cdn.prod.website-files.com/5f16d69f1760cdba99c3ce6e/67238ca08c14e1a30056db47_67238b449dc2a78254585160_02.png
};

export default Home;
