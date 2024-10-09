import React, { FC } from "react";

type DeleteSpendingModalButtons = {
  handleDelete: (e: React.MouseEvent) => void;
  handleCloseModal: (e: React.MouseEvent) => void;
};

const DeleteSpendingModalButtons: FC<DeleteSpendingModalButtons> = ({
  handleCloseModal,
  handleDelete,
}) => {
  return (
    <div className="flex flex-row justify-end w-full mt-auto">
      <button
        className="text-gray-500 mr-5 text-sm md:text-base"
        onClick={(e: React.MouseEvent) => handleCloseModal(e)}
      >
        Cancel
      </button>
      <button
        className="bg-red-500 text-white text-center font-semibold rounded py-1 px-2"
        onClick={(e: React.MouseEvent) => handleDelete(e)}
      >
        Delete spending
      </button>
    </div>
  );
};

export default DeleteSpendingModalButtons;
