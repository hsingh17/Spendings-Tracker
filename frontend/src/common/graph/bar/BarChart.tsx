import { extent, scaleBand, scaleLinear } from "d3";
import { FC, useState } from "react";
import {
  ApiResponse,
  Nullable,
  SpendingsPage,
  TooltipPosition,
} from "../../../utils/types";
import CategoricalChartTooltip from "../CategoricalChartTooltip";
import Bars from "./Bars";

type BarChartProps = {
  width: number;
  height: number;
  response: ApiResponse<SpendingsPage>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const BarChart: FC<BarChartProps> = ({ response, height, width }) => {
  const [tooltipIdx, setTooltipIdx] = useState<Nullable<number>>(null);
  const [tooltipPosition, setTooltipPosition] =
    useState<Nullable<TooltipPosition>>(null);

  const data = response.data?.spendingPage.content;
  if (!data || !data.length) {
    // This component won't get rendered if there's no data.
    // So just doing this to satisfy Typescript.
    return <></>;
  }

  const xScale = scaleBand()
    .domain(data.map((d) => d.category))
    .range([0, width])
    .padding(0.4);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.total) as [number, number])
    .range([height * 0.1, height - 100]);

  const onMouseOver = (idx: number, x: number, y: number) => {
    setTooltipIdx(idx);
    setTooltipPosition({
      left: x,
      top: y - 75,
    });
  };

  return (
    <div className="relative">
      <svg height={height} width={width}>
        <Bars
          setTooltipIdx={setTooltipIdx}
          onMouseOver={onMouseOver}
          categoricalSpendings={data}
          height={height}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>

      <CategoricalChartTooltip
        enableDynamicTooltip={false}
        category={
          tooltipIdx || tooltipIdx === 0 ? data[tooltipIdx].category : ""
        }
        total={tooltipIdx || tooltipIdx === 0 ? data[tooltipIdx].total : NaN}
        tooltipPosition={tooltipPosition}
      />
    </div>
  );
};

export default BarChart;
