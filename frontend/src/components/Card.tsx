import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

const Card: FC<RenderChildrenProps> = ({ children }) => {
  return (
    <div className="border p-7 border-slate-950 rounded-lg shadow-md bg-white flex flex-col justify-center">
      {children}
    </div>
  );
};

export default Card;