import {ReactComponent as EmptyStateIcon} from "../assets/empty-state.svg";

const TableEmptyState = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="font-bold text-theme-cta text-4xl drop-shadow-sm">No results!</h1>
      <EmptyStateIcon className="w-40 h-40 mt-3"/>
      <h2 className="font-semibold text-slate-500 mt-5">Theres no spendings to show here.</h2>
      <h2 className="font-semibold text-slate-500 -mt-1">Try adding one or navigating to another page.</h2>
    </div>
  );
};

export default TableEmptyState;