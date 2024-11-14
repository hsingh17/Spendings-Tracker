import { useSearchParams } from "react-router-dom";
import ApiCallBoundary from "../../common/ApiCallBoundary";
import GraphsContainer from "../../common/graph/GraphsContainer";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Granularity } from "../../enums/Granularity";
import { GraphTypes } from "../../enums/GraphTypes";
import useSpendings from "../../hooks/useSpendings";
import Error from "../error/Error";
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

  const setSearchParamsResetPage = (urlSearchParams: URLSearchParams) => {
    urlSearchParams.delete("page"); // Reset page
    setSearchParams(urlSearchParams);
  };

  const setSearchParamsKeepPage = (urlSearchParams: URLSearchParams) => {
    setSearchParams(urlSearchParams);
  };

  const getGranularity = (): Granularity => {
    const graphType = searchParams.get("granularity");

    if (!graphType) {
      return Granularity.Day;
    }

    return Granularity[graphType as keyof typeof Granularity];
  };

  const getGraphType = (): GraphTypes => {
    const graphType = searchParams.get("graph-type");

    if (!graphType) {
      return GraphTypes.Line;
    }

    return GraphTypes[graphType as keyof typeof GraphTypes];
  };

  return (
    <ApiCallBoundary
      errorFallback={<Error />}
      loadingFallback={<LoadingSpinner />}
      useApiCall={() => useSpendings(searchParams)}
    >
      <div className="md:relative w-full h-full flex flex-col">
        <GraphsContainer
          graphType={getGraphType()}
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
    </ApiCallBoundary>
  );
};

export default Metrics;
