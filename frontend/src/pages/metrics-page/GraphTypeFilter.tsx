import React, { FC } from "react";
import { GraphTypes } from "../../enums/GraphTypes";

type GraphTypeFilterProps = {
  graphType: GraphTypes;
  searchParams: URLSearchParams;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const GraphTypeFilter: FC<GraphTypeFilterProps> = ({
  graphType,
  searchParams,
  setSearchParams,
}) => {
  const graphTypes = Object.keys(GraphTypes).filter((val) =>
    isNaN(Number(val))
  );

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as typeof e.target & {
      value: string;
    };

    console.log(searchParams);

    // Since we're changing the graph type, clear all other params
    const keys = searchParams.keys();
    for (const key of keys) {
      console.log(key);

      searchParams.delete(key);
    }

    searchParams.set("graph-type", target.value);
    setSearchParams(searchParams);
  };

  return (
    <>
      <label className="text-sm font-semibold mb-1">Graph Type</label>
      <select
        className="p-2 mb-2 rounded-lg"
        name="graph-type"
        value={GraphTypes[graphType]}
        onChange={(e: React.ChangeEvent) => onChange(e)}
      >
        {graphTypes.map((type) => {
          return <option key={type}>{type}</option>;
        })}
      </select>
    </>
  );
};

export default GraphTypeFilter;
