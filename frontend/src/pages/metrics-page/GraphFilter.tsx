import React, { FC, useEffect, useState } from "react";
import Card from "../../common/Card";
import useDetectMobile from "../../hooks/useDetectMobile";
import { GRANULARITY, GRAPH_TYPES } from "../../utils/constants";
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
  granularity: GRANULARITY;
  graphType: GRAPH_TYPES;
  searchParams: URLSearchParams;
  defaultUrlSearchParams: URLSearchParams;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
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
  const savedPositionStyling = localStorage.getItem("positionStyling");

  const [positionStyling, setPositionStyling] = useState<Position>(
    savedPositionStyling
      ? JSON.parse(savedPositionStyling)
      : DEFAULT_FILTER_POSITION,
  );

  const isMobile = useDetectMobile();

  const [graphFilterState, setGraphFilterState] = useState<GraphFilterState>(
    isMobile ? GraphFilterState.EXPANDED : GraphFilterState.COLLAPSED,
  );

  const switchCompOnGraphsFilterState = () => {
    switch (graphFilterState) {
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
        return (
          <GraphFilterCollapsed setGraphFilterState={setGraphFilterState} />
        );
    }
  };

  const handleTouchAndDrag = (e: React.TouchEvent) => {
    if (!e.changedTouches) {
      return;
    }

    handleMoveFilterModal(
      e.currentTarget.parentElement,
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY,
    );
  };

  const handleClickAndDrag = (e: React.MouseEvent) => {
    handleMoveFilterModal(e.currentTarget.parentElement, e.clientX, e.clientY);
  };

  const handleMoveFilterModal = (
    parentElement: HTMLElement | null,
    clientX: number,
    clientY: number,
  ) => {
    if (!parentElement) {
      return;
    }

    const parentBoundingRect = parentElement.getBoundingClientRect();
    const yOffset = clientY - parentBoundingRect.y;
    const xOffset = clientX - parentBoundingRect.x;

    // Out-of-bounds of parent
    if (yOffset < 0 || xOffset < 0) {
      return;
    }

    const newPosition: Position = {
      top: `${yOffset}px`,
      left: `${xOffset}px`,
    };

    localStorage.setItem("positionStyling", JSON.stringify(newPosition));
    setPositionStyling(newPosition);
  };

  useEffect(() => {
    setGraphFilterState(
      isMobile ? GraphFilterState.EXPANDED : GraphFilterState.COLLAPSED,
    );
  }, [isMobile]);

  return (
    <div
      className="md:absolute w-full md:w-fit h-full md:h-fit"
      style={positionStyling}
      draggable={true}
      onDragEnd={(e: React.DragEvent) => handleClickAndDrag(e)}
      onTouchEnd={(e: React.TouchEvent) => handleTouchAndDrag(e)}
    >
      <Card
        className={`p-3 rounded-full h-full ${switchStylingGraphsFilterState(
          graphFilterState,
        )}`}
      >
        {switchCompOnGraphsFilterState()}
      </Card>
    </div>
  );
};

export default GraphFilter;
