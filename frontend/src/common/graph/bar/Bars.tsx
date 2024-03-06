import { ScaleBand, ScaleLinear } from "d3";
import { Dispatch, FC, SetStateAction } from "react";
import { CategoricalSpendings, Nullable } from "../../../utils/types";

type BarsProps = {
  categoricalSpendings: CategoricalSpendings[];
  height: number;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number, never>;
  setTooltipIdx: Dispatch<SetStateAction<Nullable<number>>>;
  onMouseOver: (idx: number, x: number, y: number) => void;
};

const Bars: FC<BarsProps> = ({
  categoricalSpendings,
  height,
  xScale,
  yScale,
  setTooltipIdx,
  onMouseOver,
}) => {
  return (
    <>
      {categoricalSpendings.map((categoricalSpending, i) => {
        const x = xScale(categoricalSpending.category) || 0;
        const barHeight = yScale(categoricalSpending.total);
        const y = height - barHeight;
        return (
          <rect
            key={categoricalSpending.category}
            className="hover:cursor-pointer hover:fill-theme-cta animate-[scale-bar-up_1.5s_cubic-bezier(0.25,1,0.5,1)_forwards]"
            style={{
              transformOrigin: "center bottom",
              transform: "scale(1, 0)",
            }}
            onMouseOver={() => onMouseOver(i, x, y)}
            onMouseLeave={() => setTooltipIdx(null)}
            fill="#EEEEEE"
            width={xScale.bandwidth()}
            x={x}
            y={y}
            height={barHeight}
          />
        );
      })}
    </>
  );
};

export default Bars;
