import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

const MainContentContainer: FC<RenderChildrenProps> = ({ children }) => {
  return (
    <div className="w-full p-3 overflow-x-hidden">
      {children}
    </div>
  );
};

export default MainContentContainer;