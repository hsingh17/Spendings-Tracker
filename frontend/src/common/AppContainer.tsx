import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

const AppContainer: FC<RenderChildrenProps> = ({ children }) => {
  return (
    <div className="relative m-0 p-0 flex flex-col md:flex-row w-full h-screen overflow-x-clip">
      {children}
    </div>
  );
};

export default AppContainer;
