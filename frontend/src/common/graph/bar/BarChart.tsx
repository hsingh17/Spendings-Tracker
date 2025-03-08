import { FC, useRef, useState } from "react";
import {
  ApiResponse,
  Nullable,
  SpendingListRowBarChart,
  SpendingsPage,
} from "../../../utils/types";
import Bars from "./Bars";

type BarChartProps = {
  width: number;
  height: number;
  response: ApiResponse<SpendingsPage<SpendingListRowBarChart>>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

export type ToolTipContent = {
  category: string;
  total: number;
  colorHex: string;
};
export type TooltipInfo = {
  mousePos: {
    mouseX: number;
    mouseY: number;
  };
  contents: ToolTipContent[];
};

const BarChart: FC<BarChartProps> = ({ response, height, width }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [tooltipInfo, setTooltipInfo] = useState<Nullable<TooltipInfo>>(null);

  const data = response.data?.spendingPage.content;
  if (!data || !data.length) {
    // This component won't get rendered if there's no data.
    // So just doing this to satisfy Typescript.
    return <></>;
  }

  const calculatePosStyle = () => {
    if (!divRef || !divRef.current || !tooltipInfo) {
      return {};
    }

    const bBox = divRef.current.getBoundingClientRect();
    return {
      left: `${tooltipInfo.mousePos.mouseX - bBox.left}px`,
      top: `${tooltipInfo.mousePos.mouseY}px`,
    };
  };

  console.log(tooltipInfo?.mousePos);

  return (
    <div className="relative" ref={divRef}>
      <svg height={height} width={width}>
        <Bars
          spendings={data}
          height={height}
          width={width}
          setTooltipInfo={setTooltipInfo}
        />
      </svg>

      {tooltipInfo && divRef && (
        <div
          style={calculatePosStyle()}
          className="w-10 h-10 bg-red-600 absolute"
        ></div>
      )}
    </div>
  );
};

export default BarChart;
