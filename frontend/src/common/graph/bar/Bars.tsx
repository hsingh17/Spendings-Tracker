import { extent, scaleBand, scaleLinear } from "d3";
import { Dispatch, FC, SetStateAction } from "react";
import { Nullable, SpendingListRowBarChart } from "../../../utils/types";
import Bar from "./Bar";
import { TooltipInfo } from "./BarChart";

type BarsProps = {
  spendings: SpendingListRowBarChart[];
  height: number;
  width: number;
  setTooltipInfo: Dispatch<SetStateAction<Nullable<TooltipInfo>>>;
};

const Bars: FC<BarsProps> = ({ spendings, height, width, setTooltipInfo }) => {
  // TODO: Make the 50 some function of the current width + number of bars to display (spendings.length)
  const barWidth = width / spendings.length - 50;
  const xScale = scaleBand()
    .domain(spendings.map((d) => d.date.toString()))
    .range([10, width]);

  // same with this -100
  const yScale = scaleLinear()
    .domain(extent(spendings, (d) => d.total) as [number, number])
    .range([height - 100, height * 0.1]);

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
        />
      ))}
    </svg>
  );
};

export default Bars;
