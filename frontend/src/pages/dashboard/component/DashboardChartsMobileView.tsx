import { FC } from "react";
import BarChart from "../../../common/graph/bar/BarChart";
import LineChart from "../../../common/graph/line/LineChart";
import PieChart from "../../../common/graph/pie/PieChart";
import DashboardChartContainer from "./DashboardChartContainer";
import { DashboardChartsSubContainerProps } from "./DashboardCharts";

const CHART_HEIGHT = 400;

const DashboardChartsMobileView: FC<DashboardChartsSubContainerProps> = ({
  lineChartResponse,
  barChartResponse,
  pieChartResponse,
  width = screen.availWidth,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <DashboardChartContainer>
        <LineChart
          width={width}
          response={lineChartResponse!}
          height={CHART_HEIGHT}
          allowPagination={false}
        />
      </DashboardChartContainer>

      <DashboardChartContainer>
        <BarChart
          width={width}
          height={CHART_HEIGHT}
          response={barChartResponse}
          allowPagination={false}
        />
      </DashboardChartContainer>

      <DashboardChartContainer>
        <PieChart
          width={width}
          height={CHART_HEIGHT}
          response={pieChartResponse}
        />
      </DashboardChartContainer>
    </div>
  );
};

export default DashboardChartsMobileView;
