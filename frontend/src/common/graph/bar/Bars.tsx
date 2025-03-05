import {
  extent,
  interpolateRgb,
  scaleBand,
  scaleLinear,
  scaleSequential,
} from "d3";
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

  // To create the stacked bar chart, map over the spendings then for each category
  // in the day/week/month/year, map each category to a bar.

  // TODO: break this component out
  return (
    <g>
      {spendings.map((spending) => {
        const zip = Object.entries(spending.categoryTotalMap);
        const x = xScale(spending.date.toString()) || 0;
        const y = yScale(spending.total);
        const interpolator = scaleSequential()
          .interpolator(interpolateRgb("#EEEEEE", "#00ADB5"))
          .domain([0, zip.length]);
        let lastY = height;

        return (
          <g>
            {zip.map((val, idx) => {
              const percentOfTotal = val[1] / spending.total;
              const barHeight = (height - y) * percentOfTotal;
              const barY = lastY - barHeight;
              lastY = barY;

              return (
                <Bar
                  category={val[0]}
                  height={barHeight}
                  width={barWidth}
                  x={x}
                  y={barY}
                  fill={interpolator(idx)}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
};

export default Bars;
