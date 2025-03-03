import { extent, scaleLinear, scaleTime } from "d3";
import { Dayjs } from "dayjs";
import { FC } from "react";
import {
  ApiResponse,
  SpendingListRowBarChart,
  SpendingsPage,
} from "../../../utils/types";
import Bars from "./Bars";

type BarChartProps = {
  width: number;
  height: number;
  response: ApiResponse<SpendingsPage<SpendingListRowBarChart>>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const BarChart: FC<BarChartProps> = ({ response, height, width }) => {
  const data = response.data?.spendingPage.content;
  if (!data || !data.length) {
    // This component won't get rendered if there's no data.
    // So just doing this to satisfy Typescript.
    return <></>;
  }

  const xScale = scaleTime()
    .domain(extent(data, (d) => d.date) as [Dayjs, Dayjs])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.total) as [number, number])
    .range([height * 0.1, height - 100]);

  return (
    <div className="relative">
      <svg height={height} width={width}>
        <Bars
          spendings={data}
          height={height}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>
    </div>
  );
};

export default BarChart;
