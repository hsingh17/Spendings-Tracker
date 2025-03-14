import { Dayjs } from "dayjs";
import { FC, useRef, useState } from "react";
import {
  ApiResponse,
  Nullable,
  SpendingListRowBarChart,
  SpendingsPage,
} from "../../../utils/types";
import PaginationBar from "../line/PaginationBar";
import BarChartTooltip from "./BarChartTooltip";
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

const BarChart: FC<BarChartProps> = ({
  response,
  height,
  width,
  setSearchParams,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [tooltipInfo, setTooltipInfo] = useState<Nullable<TooltipInfo>>(null);
  const prev = response.metadata?.links.prev;
  const next = response.metadata?.links.next;
  const data = response.data?.spendingPage.content;

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

  const onClickPaginationBar = (isLeft: boolean) => {
    const link = isLeft
      ? response.metadata?.links.prev
      : response.metadata?.links.next;

    if (!link) {
      return;
    }

    const queryParams = new URLSearchParams(
      link.substring(link.indexOf("?") + 1)
    );

    setSearchParams(queryParams);
  };

  if (!data || !data.length) {
    // This component won't get rendered if there's no data.
    // So just doing this to satisfy Typescript.
    return <></>;
  }

  return (
    <div className="relative overflow-y-hidden" ref={divRef}>
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
        <BarChartTooltip
          tooltipInfo={tooltipInfo}
          divStyle={calculatePosStyle()}
        />
      )}

      {prev && <PaginationBar isLeft={true} onClick={onClickPaginationBar} />}

      {next && <PaginationBar isLeft={false} onClick={onClickPaginationBar} />}
    </div>
  );
};

export default BarChart;
