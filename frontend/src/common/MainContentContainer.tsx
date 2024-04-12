import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

const MainContentContainer: FC<RenderChildrenProps> = ({ children }) => {
  return <div className="h-full w-full overflow-x-hidden">{children}</div>;
};

export default MainContentContainer;
