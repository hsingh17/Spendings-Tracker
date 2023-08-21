import { ReactComponent as EmptyStateIcon } from "../assets/empty-state.svg";

const TableEmptyState = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="font-bold text-theme-brand-secondary text-3xl drop-shadow-sm">
        No results!
      </h1>
      <EmptyStateIcon className="w-40 h-40 mt-3" />
    </div>
  );
};

export default TableEmptyState;
