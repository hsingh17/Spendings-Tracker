import { Dispatch, FC, SetStateAction } from "react";
import DownChevron from "../../assets/components/DownChevron";
import FilterIcon from "../../assets/components/FilterIcon";
import { GraphFilterState } from "./GraphsFilter";

type GraphFilterCollapsedProps = {
  setGraphFilterState: Dispatch<SetStateAction<GraphFilterState>>;
};

const GraphFilterCollapsed: FC<GraphFilterCollapsedProps> = ({
  setGraphFilterState,
}) => {
  return (
    <div
      className="p-1 flex flex-row items-center"
      onClick={(_) => setGraphFilterState(GraphFilterState.EXPANDED)}
    >
      <FilterIcon className="w-6 h-6" />
      <h1 className="ml-1 text-xl font-semibold">Filter</h1>
      <DownChevron className="h-5 w-5 ml-4 mt-1" />
    </div>
  );
};

export default GraphFilterCollapsed;
