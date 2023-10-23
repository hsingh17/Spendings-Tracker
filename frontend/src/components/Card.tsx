import { FC } from "react";
import { CardProps } from "../utils/types";

const Card: FC<CardProps> = ({
  children,
  itemsCenter,
  widthStyle = "w-fit",
  heightStyle = "h-fit",
}) => {
  return (
    <div
      className={`${widthStyle} ${heightStyle} border p-7 border-slate-950 rounded-lg shadow-md bg-white flex flex-col justify-center ${
        itemsCenter && "items-center"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
