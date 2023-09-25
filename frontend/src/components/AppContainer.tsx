import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";
import useDetectMobile from "../hooks/useDetectMobile";

const AppContainer: FC<RenderChildrenProps> = ({ children }) => {
  const mobile = useDetectMobile();
  
  return (
    <div className={`relative m-0 p-0 flex ${mobile ? "flex-col" : "flex-row"} w-full`}>
      {children}
    </div>
  );
};

export default AppContainer;