import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

const Carousel: FC<RenderChildrenProps> = ({ children }) => {
  return (
    <div className="overflow-y-scroll w-full">
      <div className="flex flex-row w-[120%] h-fit p-5 items-center">
        {children}
      </div>
    </div>
  );
};

export default Carousel;
