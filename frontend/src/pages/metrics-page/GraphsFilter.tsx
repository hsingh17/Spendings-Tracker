import { Dispatch, FC, SetStateAction } from "react";
import Card from "../../common/Card";
import { Constants } from "../../utils/constants";
import GraphDataPointFilter from "./GraphDataPointFilter";
import GraphDateFilter from "./GraphDateFilter";
import GraphTypeFilter from "./GraphTypeFilter";
import GraphGranularityFilter from "./GraphGranularityFilter";

type GraphsFilterProps = {
  granularity: Constants.GRANULARITY;
  graphType: Constants.GRAPH_TYPES;
  searchParams: URLSearchParams;
  defaultUrlSearchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

const GraphsFilter: FC<GraphsFilterProps> = ({
  granularity,
  graphType,
  searchParams,
  defaultUrlSearchParams,
  setSearchParams,
}) => {
  return (
    <Card customStyles="p-3 absolute top-8 right-64">
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
    </Card>
  );
};

export default GraphsFilter;
