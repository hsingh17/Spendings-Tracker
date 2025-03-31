import useUser from "../../hooks/useUser";
import DashboardCharts from "./component/DashboardCharts";
import RecentSpendings from "./component/RecentSpendings";

const Dashboard = () => {
  const { data: response } = useUser();
  const user = response?.data;

  return (
    <div className="flex flex-col p-5 w-full h-full overflow-y-scroll">
      <h3 className="text-slate-700 font-semibold">Dashboard</h3>
      <h1 className="text-3xl mt-3 font-semibold">
        Welcome back <span className="text-theme-cta">{user?.username}</span>
      </h1>
      <RecentSpendings />
      <DashboardCharts />
    </div>
  );
};

export default Dashboard;
