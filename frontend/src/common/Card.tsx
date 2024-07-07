import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

type CardProps = RenderChildrenProps & {
  className?: string;
  innerRef?: React.MutableRefObject<HTMLDivElement | undefined>;
};

const Card: FC<CardProps> = ({ children, innerRef = null, className = "" }) => {
  return (
    <div
      ref={innerRef}
      className={`rounded-lg shadow-md bg-white flex flex-col justify-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
