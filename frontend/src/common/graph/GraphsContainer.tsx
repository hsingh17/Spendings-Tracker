import { FC, useEffect, useRef, useState } from "react";
import { Constants } from "../../utils/constants";
import { CategoricalSpendings, SpendingListRow } from "../../utils/types";
import LineChart from "./line/LineChart";

type MetricsGraphContainerProps =
  | {
      type: Constants.GRAPH_TYPES.LINE;
      data: SpendingListRow[];
    }
  | {
      type: Constants.GRAPH_TYPES.CHART | Constants.GRAPH_TYPES.PIE;
      data: CategoricalSpendings[];
    };

const GraphsContainer: FC<MetricsGraphContainerProps> = ({ type, data }) => {
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

  const switchOnGraphType = () => {
    switch (type) {
      case Constants.GRAPH_TYPES.LINE:
        return <LineChart data={data} height={height} width={width} />;
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
      {switchOnGraphType()}
    </div>
  );
};

export default GraphsContainer;
