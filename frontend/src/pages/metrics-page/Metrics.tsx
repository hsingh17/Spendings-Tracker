import { useSearchParams } from "react-router-dom";
import GraphsContainer from "../../common/graph/GraphsContainer";
import useSpendings from "../../hooks/useSpendings";
import { Constants } from "../../utils/constants";
import { SpendingListRow } from "../../utils/types";
import GraphsFilter from "./GraphsFilter";

export const Metrics = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams([
      ["graph-type", "Line"],
      ["page", "0"],
    ])
  );

  const { data: response } = useSpendings<SpendingListRow>(searchParams);
  const getGraphType = (): Constants.GRAPH_TYPES => {
    const graphType = searchParams.get("graph-type");
    console.log(graphType);
    
    if (!graphType) {
      return Constants.GRAPH_TYPES.Line;
    }

    return Constants.GRAPH_TYPES[
      graphType as keyof typeof Constants.GRAPH_TYPES
    ];
  };

  // TODO: Error handling
  if (!response || !response.ok) {
    return <h1>Error!</h1>;
  }

  if (!response.data) {
    // TODO: Empty state
    return <h1>No data to show</h1>;
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      <GraphsContainer
        graphType={getGraphType()}
        response={response}
        setSearchParams={setSearchParams}
      />

      <GraphsFilter
        graphType={getGraphType()}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default Metrics;
