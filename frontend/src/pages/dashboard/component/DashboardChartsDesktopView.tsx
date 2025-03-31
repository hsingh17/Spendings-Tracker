import { FC } from "react";
import BarChart from "../../../common/graph/bar/BarChart";
import LineChart from "../../../common/graph/line/LineChart";
import PieChart from "../../../common/graph/pie/PieChart";
import DashboardChartContainer from "./DashboardChartContainer";
import { DashboardChartsSubContainerProps } from "./DashboardCharts";

const DashboardChartsDesktopView: FC<DashboardChartsSubContainerProps> = ({
  lineChartResponse,
  barChartResponse,
  pieChartResponse,
  width = screen.availWidth,
  height = 700,
}) => {
  return (
    <div className="flex flex-row w-full h-fit">
      <DashboardChartContainer>
        <LineChart
          width={width / 2}
          response={lineChartResponse!}
          height={height}
          allowPagination={false}
        />
      </DashboardChartContainer>

      <div className="flex flex-col w-3/5 h-full ml-2">
        <DashboardChartContainer additionalStyles="mb-2">
          <BarChart
            width={width / 2}
            height={height / 2}
            response={barChartResponse}
            allowPagination={false}
          />
        </DashboardChartContainer>

        <DashboardChartContainer>
          <PieChart
            width={width / 2}
            height={height / 2}
            response={pieChartResponse}
          />
        </DashboardChartContainer>
      </div>
    </div>
  );
};

export default DashboardChartsDesktopView;
