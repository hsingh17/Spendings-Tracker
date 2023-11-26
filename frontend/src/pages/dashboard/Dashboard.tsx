import { useNavigate } from "react-router-dom";
import { Constants } from "../../utils/constants";
import useUser from "../../hooks/useUser";
import DashboardChartsContainer from "../../common/DashboardChartsContainer";
import Carousel from "../../common/Carousel";
import Card from "../../common/Card";

const Dashboard = () => {
  const { data: response } = useUser();
  const navigate = useNavigate();
  const user = response?.data;
  
  return (
    <div className="p-2 w-full h-full">
      <h3 className="text-slate-700 font-semibold">Dashboard</h3>
      <h1 className="text-3xl mt-3 font-semibold">
        Welcome back{" "}
        <span className="text-theme-cta">{user?.username}</span>
      </h1>
      

      <Card itemsCenter={false}>
        <h2 className="text-theme-brand font-semibold text-2xl mb-3">
          Recent spendings
        </h2>
        <Carousel />
      </Card>
      {/* <DashboardChartsContainer /> */}
    </div>
  );
};

export default Dashboard;
