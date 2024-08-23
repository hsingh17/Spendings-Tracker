import React, { FC } from "react";
import { ReactComponent as WarningIcon } from "../../../assets/raw/warning-icon.svg";
import Modal from "../../../common/Modal";
import useDeleteSpending from "../../../hooks/useDeleteSpending";
import { Nullable } from "../../../utils/types";
import DeleteSpendingModalButtons from "./DeleteSpendingModalButtons";

type DeleteModalProps = {
  show: boolean;
  spendingId: Nullable<number>;
  setShow: (show: boolean) => void;
  refetch: () => void;
};

const DeleteSpendingModal: FC<DeleteModalProps> = ({
  show,
  spendingId,
  refetch,
  setShow,
}) => {
  const { mutate: deleteSpending } = useDeleteSpending(refetch);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!spendingId) {
      return;
    }

    deleteSpending(spendingId);
    setShow(false);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(false);
  };

  if (!show || !spendingId) {
    return null;
  }

  return (
    <Modal
      className={
        "top-20 left-1/2 translate-x-[-50%] bg-theme-neutral w-11/12 md:w-2/3 lg:w-1/3 h-1/2 border-2 border-gray-300 p-3"
      }
    >
      <WarningIcon className="w-21 h-21 animate-pulse" />

      <h1 className="text-xl md:text-2xl font-semibold">Delete Spending</h1>
      <p className="text-sm md:text-base text-gray-500 text-center mt-3">
        Are you sure you want to delete this spending?
      </p>
      <p className="text-sm md:text-base text-gray-500 break-words text-center mb-5 md:mb-3">
        This action is not recoverable!
      </p>

      <DeleteSpendingModalButtons
        handleCloseModal={handleCloseModal}
        handleDelete={handleDelete}
      />
    </Modal>
  );
};

export default DeleteSpendingModal;
