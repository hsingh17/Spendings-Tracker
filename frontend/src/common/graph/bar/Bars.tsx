import { ScaleLinear, ScaleTime } from "d3";
import { FC } from "react";
import { SpendingListRowBarChart } from "../../../utils/types";

type BarsProps = {
  spendings: SpendingListRowBarChart[];
  height: number;
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
};

const Bars: FC<BarsProps> = ({ spendings, height, xScale, yScale }) => {
  console.log(spendings, height, xScale, yScale);

  return <></>;
  // const [tooltipIdx, setTooltipIdx] = useState<Nullable<number>>(null);
  // const [tooltipPosition, setTooltipPosition] =
  //   useState<Nullable<TooltipPosition>>(null);
  // const onMouseOver = (idx: number, x: number, y: number) => {
  //   setTooltipIdx(idx);
  //   setTooltipPosition({
  //     left: x,
  //     top: y - 75,
  //   });
  // };
  // return (
  //   <>
  //     {spendings.map((spending, i) => {
  //       const x = xScale(spending.date) || 0;
  //       const barHeight = yScale(spending.total);
  //       const y = height - barHeight;
  //       // TODO: Make bars for each entry in spending.categoryTotalMap along the same x but diff y (stacked bar chart)
  //       return (
  //         <rect
  //           key={spending.category}
  //           className="hover:cursor-pointer hover:fill-theme-cta animate-[scale-bar-up_1.5s_cubic-bezier(0.25,1,0.5,1)_forwards]"
  //           style={{
  //             transformOrigin: "center bottom",
  //             transform: "scale(1, 0)",
  //           }}
  //           onMouseOver={() => onMouseOver(i, x, y)}
  //           onMouseLeave={() => setTooltipIdx(null)}
  //           fill="#EEEEEE"
  //           width={xScale.bandwidth()}
  //           x={x}
  //           y={y}
  //           height={barHeight}
  //         />
  //       );
  //     })}
  //   </>
  // );
};

export default Bars;
