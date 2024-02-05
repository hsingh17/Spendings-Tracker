import React, { Dispatch, FC, SetStateAction } from "react";
import { Constants } from "../../utils/constants";
import { Nullable } from "../../utils/types";

type GraphGranularityFilter = {
  granularity: Constants.GRANULARITY;
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

const GraphGranularityFilter: FC<GraphGranularityFilter> = ({
  granularity,
  searchParams,
  setSearchParams,
}) => {
  const granularities = Object.keys(Constants.GRANULARITY).filter((val) =>
    isNaN(Number(val))
  );

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as typeof e.target & {
      value: string;
    };

    searchParams.set("granularity", target.value);
    setSearchParams(searchParams);
  };

  return (
    <>
      <label>Granularity:</label>
      <select
        name="granularity"
        defaultValue={Constants.GRANULARITY[granularity]}
        onChange={(e: React.ChangeEvent) => onChange(e)}
      >
        {granularities.map((type) => {
          return <option key={type}>{type}</option>;
        })}
      </select>
    </>
  );
};

export default GraphGranularityFilter;
