import { FC } from "react";

type SubTitleProps = {
  className: string;
};
const SubTitle: FC<SubTitleProps> = ({ className = "" }) => {
  return (
    <h2 className={`${className}`}>
      Never lose track of your spendings again. Spendings Tracker will help you
      organize your spendings all in one place, all for free.
    </h2>
  );
};

export default SubTitle;
