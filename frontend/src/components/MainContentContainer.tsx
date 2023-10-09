import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

const MainContentContainer: FC<RenderChildrenProps> = ({ children }) => {
  return (
    <div className="w-full p-3">
      {children}
    </div>
  );
};

export default MainContentContainer;