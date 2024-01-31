import { FC } from "react";
import Card from "../../common/Card";
import useDetectMobile from "../../hooks/useDetectMobile";
import { Constants } from "../../utils/constants";

type GraphsFilterProps = {
  graphType: Constants.GRAPH_TYPES;
};

const GraphsFilter: FC<GraphsFilterProps> = ({ graphType }) => {
  const isMobile = useDetectMobile();
  const graphTypes = Object.keys(Constants.GRAPH_TYPES).filter((val) =>
    isNaN(Number(val))
  );

  return (
    <Card customStyles="p-2 absolute top-8 right-64">
      <label>Graph type:</label>
      <select
        name="graph-type"
        defaultValue={"TODO"}
      >
        {graphTypes.map((type) => {
          return <option key={type}>{type}</option>;
        })}
      </select>

      <label>Data Points:</label>
      <select
        name="data-points"
        defaultValue={"TODO"}
      >
        {Constants.PAGE_LIMITS.map((limit) => {
          return <option key={limit}>{limit}</option>;
        })}
      </select>
    </Card>
  );
};

export default GraphsFilter;
