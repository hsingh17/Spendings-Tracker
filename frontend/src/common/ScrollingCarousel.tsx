import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

const ScrollingCarousel: FC<RenderChildrenProps> = ({ children }) => {
  return (
    <div className="overflow-x-scroll w-full">
      <div className="flex flex-row w-full h-fit p-5 items-center">
        {children}
      </div>
    </div>
  );
};

export default ScrollingCarousel;
