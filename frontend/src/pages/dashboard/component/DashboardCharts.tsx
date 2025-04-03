import { ReactNode, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../../common/LoadingSpinner";
import useSpendings from "../../../hooks/useSpendings";
import useTooltip from "../../../hooks/useTooltip";
import {
  ApiResponse,
  SpendingListRowBarChart,
  SpendingListRowLineChart,
  SpendingListRowPieChart,
  SpendingsPage,
} from "../../../utils/types";
import Error from "../../error/Error";
import DashboardChartsDesktopView from "./DashboardChartsDesktopView";
import DashboardChartsMobileView from "./DashboardChartsMobileView";

export type DashboardChartsSubContainerProps = {
  lineChartResponse: ApiResponse<SpendingsPage<SpendingListRowLineChart>>;
  barChartResponse: ApiResponse<SpendingsPage<SpendingListRowBarChart>>;
  pieChartResponse: ApiResponse<SpendingsPage<SpendingListRowPieChart>>;
  width?: number;
  height?: number;
};

const DASHBORD_DESKTOP_VIEW_MIN_WIDTH = 1000;
const LINE_CHART_URL_SEARCH_PARAMS = new URLSearchParams([
  ["graph-type", "Line"],
  ["granularity", "Day"],
  ["page", "0"],
]);
const BAR_CHART_URL_SEARCH_PARAMS = new URLSearchParams([
  ["graph-type", "Bar"],
  ["granularity", "Day"],
  ["limit", "10"],
  ["page", "0"],
]);
const PIE_CHART_URL_SEARCH_PARAMS = new URLSearchParams([
  ["graph-type", "Pie"],
  ["page", "0"],
]);

const DashboardCharts = () => {
  const tooltip = useTooltip();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const {
    data: lineChartResponse,
    isError: lineChartError,
    isLoading: lineChartLoading,
  } = useSpendings<SpendingListRowLineChart>(LINE_CHART_URL_SEARCH_PARAMS);

  const {
    data: barChartResponse,
    isError: barChartError,
    isLoading: barChartLoading,
  } = useSpendings<SpendingListRowBarChart>(BAR_CHART_URL_SEARCH_PARAMS);

  const {
    data: pieChartResponse,
    isError: pieChartError,
    isLoading: pieChartLoading,
  } = useSpendings<SpendingListRowPieChart>(PIE_CHART_URL_SEARCH_PARAMS);

  const handleResize: ResizeObserverCallback = (
    entries: ResizeObserverEntry[]
  ) => {
    setWidth(entries[0].contentRect.width);
    setHeight(entries[0].contentRect.height);
    tooltip.hideTooltip();
  };

  const isLoading = () => {
    return lineChartLoading || barChartLoading || pieChartLoading;
  };

  const isError = () => {
    return (
      !lineChartResponse ||
      lineChartError ||
      !barChartResponse ||
      barChartError ||
      !pieChartResponse ||
      pieChartError
    );
  };

  const renderComponent = (): ReactNode => {
    if (isLoading()) {
      return <LoadingSpinner />;
    } else if (isError()) {
      return <Error />;
    } else if (width >= DASHBORD_DESKTOP_VIEW_MIN_WIDTH) {
      return (
        <DashboardChartsDesktopView
          lineChartResponse={lineChartResponse!}
          barChartResponse={barChartResponse!}
          pieChartResponse={pieChartResponse!}
          width={width}
          height={height}
        />
      );
    } else {
      return (
        <DashboardChartsMobileView
          lineChartResponse={lineChartResponse!}
          barChartResponse={barChartResponse!}
          pieChartResponse={pieChartResponse!}
          width={width}
        />
      );
    }
  };

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  return (
    <div className="w-full h-full" ref={ref}>
      {renderComponent()}
    </div>
  );
};

export default DashboardCharts;
