import { Dispatch, FC, SetStateAction, useState } from "react";
import { Constants } from "../../utils/constants";
import Card from "../../common/Card";
import GraphFilterExpanded from "./GraphFilterExpanded";
import GraphFilterCollapsed from "./GraphFilterCollapsed";

export enum GraphFilterState {
  EXPANDED,
  COLLAPSED,
}

type GraphFilterProps = {
  granularity: Constants.GRANULARITY;
  graphType: Constants.GRAPH_TYPES;
  searchParams: URLSearchParams;
  defaultUrlSearchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

function switchStylingGraphsFilterState(graphFilterState: GraphFilterState) {
  switch (graphFilterState) {
    case GraphFilterState.COLLAPSED:
      return "rounded-full hover:bg-slate-300 hover:cursor-pointer";
    case GraphFilterState.EXPANDED:
    default:
      return "rounded-sm";
  }
}

const GraphFilter: FC<GraphFilterProps> = ({
  granularity,
  graphType,
  searchParams,
  defaultUrlSearchParams,
  setSearchParams,
}) => {
  const [graphFilterState, setGraphFilterState] = useState<GraphFilterState>(
    GraphFilterState.COLLAPSED
  );

  const switchCompOnGraphsFilterState = () => {
    switch (graphFilterState) {
      case GraphFilterState.COLLAPSED:
        return (
          <GraphFilterCollapsed setGraphFilterState={setGraphFilterState} />
        );
      case GraphFilterState.EXPANDED:
        return (
          <GraphFilterExpanded
            granularity={granularity}
            graphType={graphType}
            searchParams={searchParams}
            defaultUrlSearchParams={defaultUrlSearchParams}
            setSearchParams={setSearchParams}
            setGraphFilterState={setGraphFilterState}
          />
        );
      default:
        return <h1>No such state!</h1>; // TODO
    }
  };

  return (
    <Card
      customStyles={`p-3 absolute top-8 right-64 rounded-full ${switchStylingGraphsFilterState(
        graphFilterState
      )}`}
    >
      {switchCompOnGraphsFilterState()}
    </Card>
  );
};

export default GraphFilter;
