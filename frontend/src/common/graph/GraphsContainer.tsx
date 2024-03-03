import { FC, useEffect, useRef, useState } from "react";
import useDetectMobile from "../../hooks/useDetectMobile";
import { GRAPH_TYPES } from "../../utils/constants";
import {
  ApiResponse,
  CategoricalSpendings,
  SpendingListRow,
} from "../../utils/types";
import LineChart from "./line/LineChart";
import PieChart from "./pie/PieChart";

type MetricsGraphContainerProps = {
  graphType: GRAPH_TYPES;
  response: ApiResponse<SpendingListRow[] | CategoricalSpendings[]>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const MOBILE_HEIGHT = 315;

const GraphsContainer: FC<MetricsGraphContainerProps> = ({
  graphType,
  response,
  setSearchParams,
}) => {
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
    switch (graphType) {
      case GRAPH_TYPES.Line:
        return (
          <LineChart
            response={response as ApiResponse<SpendingListRow[]>} // Hacky but I gave up trying to fight Typescript
            height={height}
            width={width}
            setSearchParams={setSearchParams}
          />
        );
      case GRAPH_TYPES.Pie:
        return (
          <PieChart
            response={response as ApiResponse<CategoricalSpendings[]>}
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
