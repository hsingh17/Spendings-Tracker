import React, { FC } from "react";
import { GRAPH_TYPES } from "../../utils/constants";

type GraphTypeFilterProps = {
  graphType: GRAPH_TYPES;
  searchParams: URLSearchParams;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const GraphTypeFilter: FC<GraphTypeFilterProps> = ({
  graphType,
  searchParams,
  setSearchParams,
}) => {
  const graphTypes = Object.keys(GRAPH_TYPES).filter((val) =>
    isNaN(Number(val))
  );

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as typeof e.target & {
      value: string;
    };

    searchParams.set("graph-type", target.value);
    setSearchParams(searchParams);
  };

  return (
    <>
      <label className="text-sm font-semibold mb-1">Graph type</label>
      <select
        className="p-2 mb-2 rounded-lg"
        name="graph-type"
        value={GRAPH_TYPES[graphType]}
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
