import React, { FC } from "react";
import { Granularity } from "../../enums/Granularity";
import { GraphTypes } from "../../enums/GraphTypes";

type GraphGranularityFilter = {
  graphType: GraphTypes;
  granularity: Granularity;
  searchParams: URLSearchParams;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const GraphGranularityFilter: FC<GraphGranularityFilter> = ({
  graphType,
  granularity,
  searchParams,
  setSearchParams,
}) => {
  // Objects.keys(GRANULARITY) returns:
  // [ "0", "1", "2", "3", "Day", "Week", "Month", "Year" ]
  // Only want the Day, Week, etc
  const granularities = Object.keys(Granularity).filter((val) =>
    isNaN(Number(val))
  );

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as typeof e.target & {
      value: string;
    };

    searchParams.set("granularity", target.value);
    setSearchParams(searchParams);
  };

  // Don't render for anything but line charts
  if (graphType !== GraphTypes.Line) {
    return <></>;
  }

  return (
    <>
      <label className="text-sm font-semibold mb-1">Granularity</label>
      <select
        className="p-2 mb-2 rounded-lg"
        name="granularity"
        value={Granularity[granularity]}
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
