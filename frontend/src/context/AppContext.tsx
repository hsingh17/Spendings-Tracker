import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Nullable } from "../utils/types";

export type TooltipContextRefType = {
  tooltip: ReactNode;
  setTooltip: Nullable<Dispatch<SetStateAction<ReactNode>>>;
};

export const TooltipContextRef = createContext<TooltipContextRefType>({
  tooltip: null,
  setTooltip: null,
});

type AppContextProps = {
  children: ReactNode;
};

const AppContext: FC<AppContextProps> = ({ children }) => {
  const [tooltip, setTooltip] = useState<ReactNode>(<></>);
  return (
    <>
      <TooltipContextRef.Provider
        value={{ tooltip: tooltip, setTooltip: setTooltip }}
      >
        {children}
      </TooltipContextRef.Provider>
    </>
  );
};

export default AppContext;
