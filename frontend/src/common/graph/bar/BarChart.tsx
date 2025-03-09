import { Dayjs } from "dayjs";
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
  date: Dayjs;
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

  return (
    <div className="relative" ref={divRef}>
      <svg height={height} width={width}>
        <Bars
          spendings={data}
          height={height}
          width={width}
          currentTooltipDate={tooltipInfo?.date}
          setTooltipInfo={setTooltipInfo}
        />
      </svg>

      {tooltipInfo && divRef && (
        <div
          style={calculatePosStyle()}
          className="flex flex-col w-fit h-fit p-2 bg-theme-brand-secondary bg-opacity-85 absolute pointer-events-none"
        >
          {tooltipInfo.contents.map((val, idx) => {
            const bg = `bg-[${val.colorHex}]`;
            return (
              <div className="flex flex-row">
                <div
                  className="w-10 h-10 p-2"
                  style={{ backgroundColor: val.colorHex }}
                ></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BarChart;
