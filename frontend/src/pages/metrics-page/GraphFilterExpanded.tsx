import { Dispatch, FC, SetStateAction } from "react";
import { GRANULARITY, GRAPH_TYPES } from "../../utils/constants";
import GraphDataPointFilter from "./GraphDataPointFilter";
import GraphDateFilter from "./GraphDateFilter";
import { GraphFilterState } from "./GraphFilter";
import GraphFilterHeader from "./GraphFilterHeader";
import GraphGranularityFilter from "./GraphGranularityFilter";
import GraphTypeFilter from "./GraphTypeFilter";

type GraphFilterExpandedProps = {
  granularity: GRANULARITY;
  graphType: GRAPH_TYPES;
  searchParams: URLSearchParams;
  defaultUrlSearchParams: URLSearchParams;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
  setGraphFilterState: Dispatch<SetStateAction<GraphFilterState>>;
};

const GraphFilterExpanded: FC<GraphFilterExpandedProps> = ({
  granularity,
  graphType,
  searchParams,
  defaultUrlSearchParams,
  setSearchParams,
  setGraphFilterState,
}) => {
  return (
    <>
      <GraphFilterHeader setGraphFilterState={setGraphFilterState} />

      <GraphTypeFilter
        graphType={graphType}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <GraphDataPointFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <GraphDateFilter
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <GraphGranularityFilter
        graphType={graphType}
        granularity={granularity}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div
        className="mt-5 p-2 w-full bg-theme-cta text-theme-neutral text-center text-xl font-semibold rounded-3xl hover:cursor-pointer"
        onClick={() =>
          setSearchParams(new URLSearchParams(defaultUrlSearchParams))
        }
      >
        Reset
      </div>
    </>
  );
};

export default GraphFilterExpanded;
