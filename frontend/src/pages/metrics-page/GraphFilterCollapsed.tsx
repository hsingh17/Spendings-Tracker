import { Dispatch, FC, SetStateAction } from "react";
import DownChevron from "../../assets/components/DownChevron";
import DragDropIcon from "../../assets/components/DragDropIcon";
import FilterIcon from "../../assets/components/FilterIcon";
import { GraphFilterState } from "./GraphFilter";

type GraphFilterCollapsedProps = {
  setGraphFilterState: Dispatch<SetStateAction<GraphFilterState>>;
};

const GraphFilterCollapsed: FC<GraphFilterCollapsedProps> = ({
  setGraphFilterState,
}) => {
  return (
    <div
      className="p-1 flex flex-row items-center"
      onClick={() => setGraphFilterState(GraphFilterState.EXPANDED)}
    >
      <DragDropIcon className="w-5 h-5 mr-auto opacity-50" />

      <FilterIcon className="ml-2 w-6 h-6" />
      <h1 className="ml-1 text-xl font-semibold">Filter</h1>
      <DownChevron className="h-5 w-5 ml-4 mt-1" />
    </div>
  );
};

export default GraphFilterCollapsed;
