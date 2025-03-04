import { interpolateRgb, ScaleLinear, scaleSequential, ScaleTime } from "d3";
import { FC } from "react";
import { SpendingListRowBarChart } from "../../../utils/types";
import Bar from "./Bar";

type BarsProps = {
  spendings: SpendingListRowBarChart[];
  height: number;
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
};

const Bars: FC<BarsProps> = ({ spendings, height, xScale, yScale }) => {
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
  return (
    <>
      {spendings.map((spending) => {
        const categoryTotalMap = spending.categoryTotalMap;
        const x = xScale(spending.date) || 0;
        const scale = scaleSequential()
          .interpolator(interpolateRgb("#EEEEEE", "#00ADB5"))
          .domain([0, categoryTotalMap.size]);
        let lastY = 0;

        spending.categoryTotalMap.entries().map((val, idx) => {
          const barHeight = yScale(val[1]);
          const y = height - barHeight + lastY;
          lastY = y;

          return (
            <Bar
              category={val[0]}
              height={barHeight}
              width={0}
              x={x}
              y={y}
              fill={scale(idx)}
            />
          );
        });
      })}
    </>
  );
};

export default Bars;
