import { useSearchParams } from "react-router-dom";
import GraphsContainer from "../../common/graph/GraphsContainer";
import useSpendings from "../../hooks/useSpendings";
import { Constants } from "../../utils/constants";
import { SpendingListRow } from "../../utils/types";
import GraphFilter from "./GraphFilter";

const DEFAULT_URL_SEARCH_PARAMS = new URLSearchParams([
  ["graph-type", "Line"],
  ["granularity", "Day"],
  ["page", "0"],
]);

export const Metrics = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    DEFAULT_URL_SEARCH_PARAMS
  );

  const { data: response } = useSpendings<SpendingListRow>(searchParams);

  const setSearchParamsResetPage = (urlSearchParams: URLSearchParams) => {
    urlSearchParams.delete("page"); // Reset page
    setSearchParams(urlSearchParams);
  };

  const setSearchParamsKeepPage = (urlSearchParams: URLSearchParams) => {
    setSearchParams(urlSearchParams);
  };

  const getGranularity = (): Constants.GRANULARITY => {
    const graphType = searchParams.get("granularity");

    if (!graphType) {
      return Constants.GRANULARITY.Day;
    }

    return Constants.GRANULARITY[
      graphType as keyof typeof Constants.GRANULARITY
    ];
  };

  const getGraphType = (): Constants.GRAPH_TYPES => {
    const graphType = searchParams.get("graph-type");

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
    <div className="md:relative w-full h-full flex flex-col">
      <GraphsContainer
        graphType={getGraphType()}
        response={response}
        setSearchParams={setSearchParamsKeepPage}
      />

      <GraphFilter
        granularity={getGranularity()}
        graphType={getGraphType()}
        searchParams={searchParams}
        defaultUrlSearchParams={DEFAULT_URL_SEARCH_PARAMS}
        setSearchParams={setSearchParamsResetPage}
      />
    </div>
  );
};

export default Metrics;