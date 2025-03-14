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

const Bars: FC<BarsProps> = ({
  spendings,
  height,
  width,
  currentTooltipDate,
  setTooltipInfo,
}) => {
  // TODO: Make the 50 some function of the current width + number of bars to display (spendings.length)
  const barWidth = width / spendings.length - 50;
  const xScale = scaleBand()
    .domain(spendings.map((d) => d.date.toString()))
    .range([100, width - 100]);

  // same with this -100
  const yScale = scaleLinear()
    .domain(extent(spendings, (d) => d.total) as [number, number])
    .range([height - 200, height * 0.1]);

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
