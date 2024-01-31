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

type MetricsGraphContainerProps = {
      graphType: Constants.GRAPH_TYPES;
      response: ApiResponse<SpendingListRow[] | CategoricalSpendings[]> ;
      setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
    };

const GraphsContainer: FC<MetricsGraphContainerProps> = ({
  graphType,
  response,
  setSearchParams,
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
    switch (graphType) {
      case Constants.GRAPH_TYPES.Line:
        return (
          <LineChart
            response={response as ApiResponse<SpendingListRow[]>} // Hacky but I gave up trying to fight Typescript
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
    new ResizeObserver(handleResize).observe(ref.current);
  }, []);

  return (
    <div
      className="w-full h-72 md:h-full justify-self-center ml-auto mr-auto bg-gray-700"
      ref={ref}
    >
      {getGraph()}
    </div>
  );
};

export default GraphsContainer;
