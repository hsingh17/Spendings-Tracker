import { extent, scaleBand, scaleLinear } from "d3";
import { Dayjs } from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import { Nullable, SpendingListRowBarChart } from "../../../utils/types";
import Bar from "./Bar";
import { TooltipInfo } from "./BarChart";

type BarsProps = {
  spendings: SpendingListRowBarChart[];
  height: number;
  width: number;
  currentTooltipDate: Nullable<Dayjs>;
  setTooltipInfo: Dispatch<SetStateAction<Nullable<TooltipInfo>>>;
};

function calculateBarWidth(width: number, length: number): number {
  return Math.min(115, width / length - 20);
}

const Bars: FC<BarsProps> = ({
  spendings,
  height,
  width,
  currentTooltipDate,
  setTooltipInfo,
}) => {
  const barWidth = calculateBarWidth(width, spendings.length);

  const xScale = scaleBand()
    .domain(spendings.map((d) => d.date.toString()))
    .range([10, width]);

  const yScale = scaleLinear()
    .domain(extent(spendings, (d) => d.total) as [number, number])
    .range([height * 0.5, height * 0.1]);

  return (
    <svg>
      {spendings.map((spending) => (
        <Bar
          key={spending.date.toString()}
          spending={spending}
          barWidth={barWidth}
          height={height}
          xScale={xScale}
          yScale={yScale}
          setTooltipInfo={setTooltipInfo}
          currentTooltipDate={currentTooltipDate}
        />
      ))}
    </svg>
  );
};

export default Bars;
