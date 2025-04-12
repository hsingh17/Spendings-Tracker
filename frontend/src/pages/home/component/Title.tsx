import { FC } from "react";

type TitleProps = {
  className: string;
};
const Title: FC<TitleProps> = ({ className = "" }) => {
  return (
    <h1 className={`text-7xl font-semibold ${className}`}>
      Organize Your Spendings.
    </h1>
  );
};

export default Title;
