import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

const AppContainer: FC<RenderChildrenProps> = ({ children }) => {
  return (
    <div className="container p-5">
      {children}
    </div>
  );
};

export default AppContainer;