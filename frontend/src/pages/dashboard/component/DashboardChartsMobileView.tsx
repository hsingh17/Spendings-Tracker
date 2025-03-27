import { FC } from "react";
import LineChart from "../../../common/graph/line/LineChart";
import { DashboardChartsSubContainerProps } from "./DashboardCharts";

const CHART_HEIGHT = 400;

const DashboardChartsMobileView: FC<DashboardChartsSubContainerProps> = ({
  lineChartResponse,
  barChartResponse,
  pieChartResponse,
  width = screen.availWidth,
}) => {
  console.log(barChartResponse, pieChartResponse);

  return (
    <div className="flex flex-col w-full h-full">
      <LineChart
        width={width}
        response={lineChartResponse!}
        height={CHART_HEIGHT}
        allowPagination={false}
      />
      <div className="bg-purple-600 h-[1000px] mb-2"></div>
      <div className="bg-orange-600 h-[1000px]"></div>
    </div>
  );
};

export default DashboardChartsMobileView;
