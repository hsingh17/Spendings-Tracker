import { FC, useEffect, useRef, useState } from "react";
import useDetectMobile from "../../hooks/useDetectMobile";
import { GRAPH_TYPES } from "../../utils/constants";
import { ApiResponse, SpendingsPage } from "../../utils/types";
import BarChart from "./bar/BarChart";
import GraphEmptyState from "./GraphEmptyState";
import LineChart from "./line/LineChart";
import PieChart from "./pie/PieChart";

type MetricsGraphContainerProps = {
  graphType: GRAPH_TYPES;
  response?: ApiResponse<SpendingsPage>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const MOBILE_HEIGHT = 315;

const GraphsContainer: FC<MetricsGraphContainerProps> = ({
  graphType,
  response,
  setSearchParams,
}) => {
  const spendings = response?.data?.spendingPage.content;
  const isMobile = useDetectMobile();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(-1);
  const [width, setWidth] = useState<number>(-1);

  const handleResize = () => {
    if (!ref || !ref.current) {
      return;
    }

    setHeight(isMobile ? MOBILE_HEIGHT : ref.current.offsetHeight);
    setWidth(ref.current.offsetWidth);
  };

  const getGraph = () => {
    // If response is ever null, ApiCallBoundary would never render this component.
    const responseNotNull = response!;

    switch (graphType) {
      case GRAPH_TYPES.Line:
        return (
          <LineChart
            response={responseNotNull}
            height={height}
            width={width}
            setSearchParams={setSearchParams}
          />
        );
      case GRAPH_TYPES.Pie:
        return (
          <PieChart
            response={responseNotNull}
            height={height}
            width={width}
            setSearchParams={setSearchParams}
          />
        );
      case GRAPH_TYPES.Bar:
        return (
          <BarChart
            response={responseNotNull}
            height={height}
            width={width}
            setSearchParams={setSearchParams}
          />
        );
      default:
        return <h1>No graph found for {graphType}</h1>;
    }
  };

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    // Mount a ResizeObserver to watch for any changes to the div element being resized
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [isMobile]);

  if (!spendings || !spendings.length) {
    return <GraphEmptyState />;
  }

  return (
    <div
      className="w-full md:h-full justify-self-center ml-auto mr-auto bg-gray-700"
      style={isMobile ? { height: MOBILE_HEIGHT } : {}}
      ref={ref}
    >
      {getGraph()}
    </div>
  );
};

export default GraphsContainer;
