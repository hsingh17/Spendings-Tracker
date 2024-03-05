import { extent, scaleBand, scaleLinear } from "d3";
import { FC } from "react";
import { ApiResponse, CategoricalSpendings } from "../../../utils/types";
import Bars from "./Bars";

type BarChartProps = {
  width: number;
  height: number;
  response: ApiResponse<CategoricalSpendings[]>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const BarChart: FC<BarChartProps> = ({ response, height, width }) => {
  const data = response.data;
  if (!data) {
    return <>TODO</>;
  }

  const xScale = scaleBand()
    .domain(data.map((d) => d.category))
    .range([0, width])
    .padding(0.4);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.total) as [number, number])
    .range([0, height - 100]);

  return (
    <div>
      <svg height={height} width={width}>
        <Bars
          categoricalSpendings={data}
          height={height}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>
    </div>
  );
};

export default BarChart;
