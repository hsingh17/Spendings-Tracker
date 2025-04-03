import { FC, useContext } from "react";
import { TooltipContextRef } from "../context/AppContext";
import { RenderChildrenProps } from "../utils/types";

const AppContainer: FC<RenderChildrenProps> = ({ children }) => {
  const tooltipRefContext = useContext(TooltipContextRef);

  return (
    <div className="relative m-0 p-0 flex flex-col md:flex-row w-full h-screen overflow-x-clip">
      <div id="tooltip-placeholder" className="absolute w-fit h-fit z-10">
        {tooltipRefContext.tooltip}
      </div>
      {children}
    </div>
  );
};

export default AppContainer;
