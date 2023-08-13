import { ReactComponent as SortUp } from "../assets/sort-up.svg";
import { ReactComponent as SortDown } from "../assets/sort-down.svg";

const SortIcon = () => {
  const className: string = "w-5 h-5";
  return (
    <div className="flex flex-col">
      <SortUp className={className} stroke="white" fill="white" />
      <SortDown
        className={`${className} -mt-[22.5px]`}
        stroke="white"
        fill="white"
      />
    </div>
  );
};

export default SortIcon;
