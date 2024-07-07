import React, { Dispatch, FC, SetStateAction } from "react";
import GenericForm from "../../../common/form/GenericForm";
import Modal from "../../../common/Modal";
import {
  CategoriesMap,
  Nullable,
  SpendingFormInput,
} from "../../../utils/types";

type SaveSpendingsModalProps = {
  categoriesMap: CategoriesMap;
  spending: Nullable<SpendingFormInput>;
  addNewRow: (e: React.MouseEvent) => void;
  setModalSpendingIdx: Dispatch<SetStateAction<number | undefined>>;
};

const SaveSpendingsModal: FC<SaveSpendingsModalProps> = ({
  spending,
  addNewRow,
  setModalSpendingIdx,
}) => {
  if (!spending) {
    return null;
  }

  const setShow = () => {
    setModalSpendingIdx(undefined);
  };

  return (
    <Modal
      show={true}
      actionButtonDesc="Add"
      className="w-fit"
      actionButtonClassName="bg-blue-500"
      setShow={setShow}
      onClickActionButton={addNewRow}
    >
      <GenericForm
        wrapperClassName="h-fit"
        cardClassName="w-10"
        title={!spending.spendingId ? "Add" : "Edit"}
        onSubmit={() => alert("TODO")}
        formChildren={
          <>
            <label>Category</label>
            <input type="" id="category" />
            <label>Amount</label>
            <input
              id="amount"
              type="number"
              defaultValue={spending.amount || 0}
            />
          </>
        }
      />
    </Modal>
  );
};

export default SaveSpendingsModal;
