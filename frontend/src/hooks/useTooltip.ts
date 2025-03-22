import { ReactNode, useContext } from "react";
import { TooltipContextRef } from "../context/AppContext";

export default function useTooltip() {
  const tooltipRefContext = useContext(TooltipContextRef);
  const showTooltip = (tooltip: ReactNode) => {
    if (tooltipRefContext && tooltipRefContext.setTooltip) {
      tooltipRefContext.setTooltip(tooltip);
    }
  };

  return { showTooltip: showTooltip };
}
