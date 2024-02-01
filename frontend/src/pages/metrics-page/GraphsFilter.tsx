import { Dispatch, FC, SetStateAction } from "react";
import Card from "../../common/Card";
import useDetectMobile from "../../hooks/useDetectMobile";
import { Constants } from "../../utils/constants";
import GraphDataPointFilter from "./GraphDataPointFilter";
import GraphTypeFilter from "./GraphTypeFilter";
import GraphDateFilter from "./GraphDateFilter";

type GraphsFilterProps = {
  graphType: Constants.GRAPH_TYPES;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

const GraphsFilter: FC<GraphsFilterProps> = ({ graphType, setSearchParams }) => {
  const isMobile = useDetectMobile();
  
  return (
    <Card customStyles="p-2 absolute top-8 right-64">
      <GraphTypeFilter graphType={graphType} setSearchParams={setSearchParams} />
      <GraphDataPointFilter setSearchParams={setSearchParams} />
      <GraphDateFilter setSearchParams={setSearchParams} />
    </Card>
  );
};

export default GraphsFilter;
