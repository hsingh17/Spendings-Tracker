import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Card from "../../common/Card";
import { Constants } from "../../utils/constants";
import GraphFilterCollapsed from "./GraphFilterCollapsed";
import GraphFilterExpanded from "./GraphFilterExpanded";

const DEFAULT_FILTER_POSITION: Position = {
  top: "32px",
  right: "80px",
};

export enum GraphFilterState {
  EXPANDED,
  COLLAPSED,
}

type Position = {
  top: string;
  left?: string;
  right?: string;
};

type GraphFilterProps = {
  granularity: Constants.GRANULARITY;
  graphType: Constants.GRAPH_TYPES;
  searchParams: URLSearchParams;
  defaultUrlSearchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

function switchStylingGraphsFilterState(graphFilterState: GraphFilterState) {
  switch (graphFilterState) {
    case GraphFilterState.COLLAPSED:
      return "rounded-full hover:bg-slate-300 hover:cursor-pointer";
    case GraphFilterState.EXPANDED:
    default:
      return "rounded-sm";
  }
}

const GraphFilter: FC<GraphFilterProps> = ({
  granularity,
  graphType,
  searchParams,
  defaultUrlSearchParams,
  setSearchParams,
}) => {
  const savedPositionStyling = window.localStorage.getItem("positionStyling");
  const [positionStyling, setPositionStyling] = useState<Position>(
    savedPositionStyling
      ? JSON.parse(savedPositionStyling)
      : DEFAULT_FILTER_POSITION
  );

  const [graphFilterState, setGraphFilterState] = useState<GraphFilterState>(
    GraphFilterState.COLLAPSED
  );

  const switchCompOnGraphsFilterState = () => {
    switch (graphFilterState) {
      case GraphFilterState.COLLAPSED:
        return (
          <GraphFilterCollapsed setGraphFilterState={setGraphFilterState} />
        );
      case GraphFilterState.EXPANDED:
        return (
          <GraphFilterExpanded
            granularity={granularity}
            graphType={graphType}
            searchParams={searchParams}
            defaultUrlSearchParams={defaultUrlSearchParams}
            setSearchParams={setSearchParams}
            setGraphFilterState={setGraphFilterState}
          />
        );
      default:
        return <h1>No such state!</h1>; // TODO
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    const parentElement = e.currentTarget.parentElement;
    if (!parentElement) {
      // TODO
      return;
    }

    const parentBoundingRect = parentElement.getBoundingClientRect();

    const yOffset = e.clientY - parentBoundingRect.y;
    const xOffset = e.clientX - parentBoundingRect.x;

    // Out-of-bounds of parent
    if (yOffset < 0 || xOffset < 0) {
      return;
    }

    const newPosition: Position = {
      top: `${yOffset}px`,
      left: `${xOffset}px`,
    };

    window.localStorage.setItem("positionStyling", JSON.stringify(newPosition));
    setPositionStyling(newPosition);
  };

  return (
    <div
      className="absolute w-fit h-fit"
      style={positionStyling}
      draggable={true}
      onDragEnd={(e: React.DragEvent) => handleDrag(e)}
    >
      <Card
        customStyles={`p-3 rounded-full ${switchStylingGraphsFilterState(
          graphFilterState
        )}`}
      >
        {switchCompOnGraphsFilterState()}
      </Card>
    </div>
  );
};

export default GraphFilter;
