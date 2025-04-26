import { Dispatch, FC, SetStateAction } from "react";
import DragDropIcon from "../../assets/components/DragDropIcon";
import UpChevron from "../../assets/components/UpChevron";
import useDetectScreenWidth from "../../hooks/useDetectScreenWidth";
import { GraphFilterState } from "./GraphFilter";

type GraphFilterHeaderProps = {
  setGraphFilterState: Dispatch<SetStateAction<GraphFilterState>>;
};

const GraphFilterHeader: FC<GraphFilterHeaderProps> = ({
  setGraphFilterState,
}) => {
  const isMobile = useDetectScreenWidth();
  if (isMobile) {
    return <></>;
  }

  return (
    <div
      className="flex flex-row p-1 hover:cursor-pointer"
      onClick={() => setGraphFilterState(GraphFilterState.COLLAPSED)}
    >
      <DragDropIcon className="w-5 h-5 mr-auto opacity-50" />
      <UpChevron className="w-5 h-5 ml-auto mr-3" />
    </div>
  );
};

export default GraphFilterHeader;
