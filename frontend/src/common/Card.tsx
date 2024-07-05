import { FC } from "react";
import { RenderChildrenProps } from "../utils/types";

type CardProps = RenderChildrenProps & {
  customStyles?: string;
  innerRef?: React.MutableRefObject<HTMLDivElement | undefined>;
};

const Card: FC<CardProps> = ({
  children,
  innerRef = null,
  customStyles = "",
}) => {
  return (
    <div
      ref={innerRef}
      className={`border border-slate-950 rounded-lg shadow-md bg-white flex flex-col justify-center ${customStyles}`}
    >
      {children}
    </div>
  );
};

export default Card;
