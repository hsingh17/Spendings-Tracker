import { Dispatch, FC, SetStateAction } from "react";
import GraphDataPointFilter from "./GraphDataPointFilter";
import GraphDateFilter from "./GraphDateFilter";
import GraphGranularityFilter from "./GraphGranularityFilter";
import GraphTypeFilter from "./GraphTypeFilter";
import { Constants } from "../../utils/constants";
import { GraphFilterState } from "./GraphsFilter";
import UpChevron from "../../assets/components/UpChevron";
import DragDropIcon from "../../assets/components/DragDropIcon";

type GraphFilterExpandedProps = {
  granularity: Constants.GRANULARITY;
  graphType: Constants.GRAPH_TYPES;
  searchParams: URLSearchParams;
  defaultUrlSearchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
  setGraphFilterState: Dispatch<SetStateAction<GraphFilterState>>;
};

const GraphFilterExpanded: FC<GraphFilterExpandedProps> = ({
  granularity,
  graphType,
  searchParams,
  defaultUrlSearchParams,
  setSearchParams,
  setGraphFilterState,
}) => (
  <>
    <div
      className="flex flex-row p-1 hover:cursor-pointer"
      onClick={(_) => setGraphFilterState(GraphFilterState.COLLAPSED)}
    >
      <DragDropIcon className="w-5 h-5 mr-auto opacity-50" />
      <UpChevron className="w-5 h-5 ml-auto mr-3" />
    </div>

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
      granularity={granularity}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />

    <div
      className="mt-5 p-2 w-full bg-theme-cta text-theme-neutral text-center text-xl font-semibold rounded-3xl hover:cursor-pointer"
      onClick={(_) =>
        setSearchParams(new URLSearchParams(defaultUrlSearchParams))
      }
    >
      Reset
    </div>
  </>
);

export default GraphFilterExpanded;
