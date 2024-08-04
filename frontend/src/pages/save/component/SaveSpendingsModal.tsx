import { Dispatch, FC, SetStateAction } from "react";
import GenericForm from "../../../common/form/GenericForm";
import Modal from "../../../common/Modal";
import {
  CategoriesMap,
  Nullable,
  SpendingFormInput,
} from "../../../utils/types";
import SaveSpendingsModalAmount from "./SaveSpendingsModalAmount";
import SaveSpendingsModalCategory from "./SaveSpendingsModalCategory";
import SaveSpendingsModalFormFooter from "./SaveSpendingsModalFormFooter";

type SaveSpendingsModalProps = {
  categoriesMap: CategoriesMap;
  spending: Nullable<SpendingFormInput>;
  onSubmit: (inputMap: Map<string, string>) => void;
  setModalSpendingIdx: Dispatch<SetStateAction<number | undefined>>;
};

const SaveSpendingsModal: FC<SaveSpendingsModalProps> = ({
  categoriesMap,
  spending,
  onSubmit,
  setModalSpendingIdx,
}) => {
  if (!spending) {
    return null;
  }

  const setShow = () => {
    setModalSpendingIdx(undefined);
  };

  const onSubmitWrapper = (inputMap: Map<string, string>) => {
    setShow();
    onSubmit(inputMap);
  };

  return (
    <Modal className="w-full md:w-[600px]">
      <GenericForm
        wrapperClassName="h-fit w-full"
        cardClassName="w-full"
        formClassName="flex flex-col"
        title={!spending.spendingId ? "Add" : "Edit"}
        onSubmit={onSubmitWrapper}
        formChildren={
          <>
            <SaveSpendingsModalCategory
              spending={spending}
              categoriesMap={categoriesMap}
            />
            <SaveSpendingsModalAmount spending={spending} />
            <SaveSpendingsModalFormFooter setShow={setShow} />
          </>
        }
      />
    </Modal>
  );
};

export default SaveSpendingsModal;
