import { FC } from "react";
import { CardProps } from "../utils/types";

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
