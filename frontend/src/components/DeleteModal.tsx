import { FC } from "react";
import useDeleteSpending from "../hooks/useDeleteSpending";
import { DeleteModalProps } from "../utils/types";
import {ReactComponent as WarningIcon} from "../assets/warning-icon.svg";

const DeleteModal: FC<DeleteModalProps> = ({
  show,
  parentRefetch,
  spendingId,
}) => {
  
  const { mutate: deleteSpending } = useDeleteSpending(parentRefetch);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed bg-slate-300 bg-opacity-80 filter backdrop-blur-[1px] w-full h-full top-0 left-0">
      <div 
        className="fixed flex flex-col justify-center items-center z-10 top-20 left-1/2 translate-x-[-50%] bg-theme-neutral rounded-lg w-11/12 md:w-2/3 lg:w-1/3 h-1/2 shadow-3xl border-2 border-gray-300 p-3">
        <WarningIcon className="w-21 h-21" />
        <h1 className="text-xl md:text-2xl font-semibold">Delete Spending</h1>
        <p className="text-sm md:text-base text-gray-500 text-center mt-3">Are you sure you want to delete this spending?</p>
        <p className="text-sm md:text-base text-gray-500 break-words text-center mb-5 md:mb-3">This action is not recoverable!</p>
        <div className="flex flex-row justify-end w-full mt-auto">
          <button className="text-gray-500 mr-3 text-sm md:text-base">Cancel</button>
          <button className="bg-red-500 text-white text-center font-semibold rounded py-1 px-2">Delete spending</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
