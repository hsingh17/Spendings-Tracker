import ThumbnailBarChart from "../../../common/graph/ThumbnailBarChart";
import ThumbnailLineChart from "../../../common/graph/ThumbnailLineChart";
import ThumbnailPieChart from "../../../common/graph/ThumbnailPieChart";

const DashboardChartsContainer = () => {
  return (
    <div>
      <ThumbnailBarChart />
      <ThumbnailLineChart />
      <ThumbnailPieChart />
    </div>
  );
};

export default DashboardChartsContainer;
