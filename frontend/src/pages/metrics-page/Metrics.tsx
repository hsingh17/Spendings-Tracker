import { useState } from "react";
import GraphsContainer from "../../common/graph/GraphsContainer";
import useSpendings from "../../hooks/useSpendings";
import { Constants } from "../../utils/constants";
import { SpendingListRow } from "../../utils/types";

export const Metrics = () => {
  const [graphType, setGraphType] = useState<number>(
    Constants.GRAPH_TYPES.LINE
  );
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams([])
  );

  const { data: response } = useSpendings<SpendingListRow>(searchParams);

  // TODO: Error handling
  if (!response || !response.ok) {
    return <h1>Error!</h1>;
  }

  if (!response.data) {
    // TODO: Empty state
    return <h1>Nothing to graph</h1>;
  }

  return (
    <div className="p-2 w-full h-fit flex flex-col">
      <h3 className="text-slate-700 font-semibold">Metrics</h3>
      <h1>Filters</h1>
      <GraphsContainer
        type={graphType}
        response={response}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default Metrics;
