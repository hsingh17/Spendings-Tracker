import React, { FC } from "react";
import { Constants } from "../../utils/constants";

type GraphGranularityFilter = {
  granularity: Constants.GRANULARITY;
  searchParams: URLSearchParams;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
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
      <label className="text-sm font-semibold mb-1">Granularity</label>
      <select
        className="p-2 mb-2 rounded-lg"
        name="granularity"
        value={Constants.GRANULARITY[granularity]}
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
