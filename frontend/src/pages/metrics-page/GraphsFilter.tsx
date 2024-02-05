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
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

const GraphsFilter: FC<GraphsFilterProps> = ({
  granularity,
  graphType,
  searchParams,
  setSearchParams,
}) => {
  return (
    <Card customStyles="p-2 absolute top-8 right-64">
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
    </Card>
  );
};

export default GraphsFilter;
