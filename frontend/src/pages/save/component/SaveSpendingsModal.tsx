import React, { Dispatch, FC, SetStateAction } from "react";
import GenericForm from "../../../common/form/GenericForm";
import Modal from "../../../common/Modal";
import {
  CategoriesMap,
  Nullable,
  SpendingFormInput,
} from "../../../utils/types";
import SaveSpendingsModalAmountInput from "./SaveSpendingsModalAmountInput";
import SaveSpendingsModalCategoryInput from "./SaveSpendingsModalCategoryInput";
import SaveSpendingsModalFormFooter from "./SaveSpendingsModalFormFooter";

type SaveSpendingsModalProps = {
  categoriesMap: CategoriesMap;
  spending: Nullable<SpendingFormInput>;
  addNewRow: (e: React.MouseEvent) => void;
  setModalSpendingIdx: Dispatch<SetStateAction<number | undefined>>;
};

const SaveSpendingsModal: FC<SaveSpendingsModalProps> = ({
  categoriesMap,
  spending,
  // addNewRow,
  setModalSpendingIdx,
}) => {
  if (!spending) {
    return null;
  }

  const setShow = () => {
    setModalSpendingIdx(undefined);
  };

  return (
    <Modal show={true} className="w-full md:w-[600px]" setShow={setShow}>
      <GenericForm
        wrapperClassName="h-fit w-full"
        cardClassName="w-full"
        formClassName="flex flex-col"
        title={!spending.spendingId ? "Add" : "Edit"}
        onSubmit={() => alert("TODO")}
        formChildren={
          <>
            <SaveSpendingsModalCategoryInput categoriesMap={categoriesMap} />
            <SaveSpendingsModalAmountInput spending={spending} />
          </>
        }
        afterFormChildren={<SaveSpendingsModalFormFooter setShow={setShow} />}
      />
    </Modal>
  );
};

export default SaveSpendingsModal;
