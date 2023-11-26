import { useNavigate } from "react-router-dom";
import { Constants } from "../../utils/constants";
import useUser from "../../hooks/useUser";
import DashboardChartsContainer from "../../common/DashboardChartsContainer";
import Carousel from "../../common/Carousel";

const Dashboard = () => {
  const { data: response } = useUser();
  const navigate = useNavigate();
  const user = response?.data;
  
  return (
    <div className="p-2 w-full h-full">
      <h2 className="text-slate-700 font-semibold">Dashboard</h2>
      <h1 className="text-3xl mt-3 font-semibold">
        Welcome back{" "}
        <span className="text-theme-cta">{user?.username}</span>
      </h1>
      
      <Carousel />
      {/* <DashboardChartsContainer /> */}
    </div>
  );
};

export default Dashboard;
