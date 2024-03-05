import { ScaleBand, ScaleLinear } from "d3";
import { FC } from "react";
import { CategoricalSpendings } from "../../../utils/types";

type BarsProps = {
  categoricalSpendings: CategoricalSpendings[];
  height: number;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number, never>;
};
const Bars: FC<BarsProps> = ({
  categoricalSpendings,
  height,
  xScale,
  yScale,
}) => {
  return (
    <>
      {categoricalSpendings.map((categoricalSpending) => {
        return (
          <rect
            className="hover:cursor-pointer animate-[scale-bar-up_1.5s_cubic-bezier(0.25,1,0.5,1)_forwards]"
            style={{
              transformOrigin: "center bottom",
              transform: "scale(1, 0)",
            }}
            fill="#EEEEEE"
            width={xScale.bandwidth()}
            x={xScale(categoricalSpending.category)}
            y={height - yScale(categoricalSpending.total)}
            height={yScale(categoricalSpending.total)}
          />
        );
      })}
    </>
  );
};

export default Bars;
