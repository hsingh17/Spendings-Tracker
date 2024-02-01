import React, { Dispatch, FC, SetStateAction } from "react";
import { Constants } from "../../utils/constants";

type GraphTypeFilterProps = {
  graphType: Constants.GRAPH_TYPES;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

const GraphTypeFilter: FC<GraphTypeFilterProps> = ({
  graphType,
  setSearchParams,
}) => {
  const graphTypes = Object.keys(Constants.GRAPH_TYPES).filter((val) =>
    isNaN(Number(val))
  );

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as typeof e.target & {
      value: Constants.GRAPH_TYPES;
    };
    
    // TODO
  };

  return (
    <>
      <label>Graph type:</label>
      <select
        name="graph-type"
        defaultValue={Constants.GRAPH_TYPES[graphType]}
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
