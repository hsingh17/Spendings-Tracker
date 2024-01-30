import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Constants } from "../../utils/constants";
import {
  ApiResponse,
  CategoricalSpendings,
  SpendingListRow,
} from "../../utils/types";
import LineChart from "./line/LineChart";

type MetricsGraphContainerProps =
  | {
      type: Constants.GRAPH_TYPES.LINE;
      response: ApiResponse<SpendingListRow[]>;
      setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
    }
  | {
      type: Constants.GRAPH_TYPES.CHART | Constants.GRAPH_TYPES.PIE;
      response: ApiResponse<CategoricalSpendings[]>;
      setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
    };

const GraphsContainer: FC<MetricsGraphContainerProps> = ({
  type,
  response,
  setSearchParams
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(-1);
  const [width, setWidth] = useState<number>(-1);

  const handleResize = () => {
    if (!ref || !ref.current) {
      return;
    }

    setHeight(ref.current.offsetHeight);
    setWidth(ref.current.offsetWidth);
  };

  const getGraph = () => {
    switch (type) {
      case Constants.GRAPH_TYPES.LINE:
        return (
          <LineChart
            response={response}
            height={height}
            width={width}
            setSearchParams={setSearchParams}
          />
        );
      default:
        return <h1>No graph found for {type}</h1>;
    }
  };

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    // Mount a ResizeObserver to watch for any changes to the div element being resized
    new ResizeObserver(handleResize).observe(ref.current);
  }, []);

  return (
    <div
      className="w-full md:w-3/4 h-72 md:h-96 justify-self-center ml-auto mr-auto bg-gray-700"
      ref={ref}
    >
      {getGraph()}
    </div>
  );
};

export default GraphsContainer;
