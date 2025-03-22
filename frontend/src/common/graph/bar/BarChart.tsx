import { Dayjs } from "dayjs";
import { FC, useRef } from "react";
import useTooltip from "../../../hooks/useTooltip";
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
  const tooltip = useTooltip();
  const prev = response.metadata?.links.prev;
  const next = response.metadata?.links.next;
  const data = response.data?.spendingPage.content;

  const calculatePosStyle = (tooltipInfo: TooltipInfo) => {
    if (!divRef || !divRef.current || !tooltipInfo) {
      return {};
    }

    return {
      left: `${tooltipInfo.mousePos.mouseX}px`,
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

  const setTooltipInfo = (tooltipInfo: Nullable<TooltipInfo>) => {
    tooltip.showTooltip(
      tooltipInfo ? (
        <BarChartTooltip
          tooltipInfo={tooltipInfo}
          divStyle={calculatePosStyle(tooltipInfo)}
        />
      ) : (
        <></>
      )
    );
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
          setTooltipInfo={setTooltipInfo}
        />
      </svg>

      {prev && <PaginationBar isLeft={true} onClick={onClickPaginationBar} />}

      {next && <PaginationBar isLeft={false} onClick={onClickPaginationBar} />}
    </div>
  );
};

export default BarChart;
