import { useState } from "react";
import useSpendings from "../../hooks/useSpendings";
import { Constants } from "../../utils/constants";
import { SpendingListRow } from "../../utils/types";
import GraphsContainer from "../../common/GraphsContainer";

export const Metrics = () => {
  const [graphType, setGraphType] = useState<number>(
    Constants.GRAPH_TYPES.LINE
  );
  const searchParams = new URLSearchParams([["page", "1"]]);
  const { data: response } = useSpendings<SpendingListRow>(searchParams);
  // TODO: Error handling
  if (!response || !response.ok) {
    return <h1>Error!</h1>;
  }

  if (!response.data) {
    // TODO: Empty state
    return <h1>Nothing to graph</h1>
  }

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <h3 className="text-slate-700 font-semibold">Metrics</h3>
      <h1>Filters</h1>
      <GraphsContainer
        type={graphType}
        data={response.data}
      />
    </div>
  );
};

export default Metrics;
