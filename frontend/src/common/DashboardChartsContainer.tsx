import ThumbnailBarChart from "./ThumbnailBarChart";
import ThumbnailLineChart from "./ThumbnailLineChart";
import ThumbnailPieChart from "./ThumbnailPieChart";

const DashboardChartsContainer = () => {
  return (
    <div>
      <ThumbnailBarChart />
      <ThumbnailLineChart />
      <ThumbnailPieChart />
    </div>
  )
};

export default DashboardChartsContainer;
