import { PieArcDatum } from "d3";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Nullable, SpendingListRowPieChart } from "../../../utils/types";

type PieChartSectorProps = {
  datum: PieArcDatum<SpendingListRowPieChart>;
  idx: number;
  fill: string;
  arcStyle?: string;
  path?: string;
  onMouseMove: (e: React.MouseEvent, i: number, angle: number) => void;
  setTooltipIdx: Dispatch<SetStateAction<Nullable<number>>>;
};

const PieChartSector: FC<PieChartSectorProps> = ({
  datum,
  idx,
  fill,
  arcStyle,
  path,
  onMouseMove,
  setTooltipIdx,
}) => {
  return (
    <g
      key={datum.data.category}
      className="hover:cursor-pointer"
      onMouseMove={(e) => {
        onMouseMove(e, idx, (datum.startAngle + datum.endAngle) / 2);
      }}
      onMouseLeave={() => setTooltipIdx(null)}
    >
      <path
        d={path}
        fill={"white"}
        stroke="#374151"
        fillOpacity={0}
        strokeWidth={3}
      />

      <path
        style={arcStyle ? { transform: arcStyle } : {}}
        d={path}
        fill={fill}
        stroke="#374151"
        strokeWidth={3}
      />
    </g>
  );
};

export default PieChartSector;
