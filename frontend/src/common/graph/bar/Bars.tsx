import { extent, scaleBand, scaleLinear } from "d3";
import { FC } from "react";
import { SpendingListRowBarChart } from "../../../utils/types";
import Bar from "./Bar";

type BarsProps = {
  spendings: SpendingListRowBarChart[];
  height: number;
  width: number;
};

const Bars: FC<BarsProps> = ({ spendings, height, width }) => {
  const barWidth = width / spendings.length - 10;
  const xScale = scaleBand()
    .domain(spendings.map((d) => d.date.toString()))
    .range([10, width]);

  const yScale = scaleLinear()
    .domain(extent(spendings, (d) => d.total) as [number, number])
    .range([height - 100, height * 0.1]);

  // const [tooltipIdx, setTooltipIdx] = useState<Nullable<number>>(null);
  // const [tooltipPosition, setTooltipPosition] =
  //   useState<Nullable<TooltipPosition>>(null);

  //   const onMouseOver = (idx: number, x: number, y: number) => {
  //   setTooltipIdx(idx);
  //   setTooltipPosition({
  //     left: x,
  //     top: y - 75,
  //   });
  // };

  return (
    <g>
      {spendings.map((spending) => {
        return (
          <Bar
            spending={spending}
            barWidth={barWidth}
            height={height}
            xScale={xScale}
            yScale={yScale}
          />
        );
      })}
    </g>
  );
};

export default Bars;
