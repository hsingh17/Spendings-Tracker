import { FC } from "react";
import GenericForm from "../../../common/form/GenericForm";
import { CategoriesMap, Nullable, Spending } from "../../../utils/types";
import SaveSpendingsModalAmount from "./SaveSpendingsModalAmount";
import SaveSpendingsModalCategory from "./SaveSpendingsModalCategory";
import SaveSpendingsModalFormFooter from "./SaveSpendingsModalFormFooter";

type SaveSpendingsModalFormProps = {
  categoriesMap: CategoriesMap;
  spending: Nullable<Spending>;
  onSubmit: (inputMap: Map<string, string>) => void;
  closeModal: () => void;
};

const SaveSpendingsModalForm: FC<SaveSpendingsModalFormProps> = ({
  categoriesMap,
  spending,
  onSubmit,
  closeModal,
}) => {
  if (!spending) {
    return <></>;
  }

  return (
    <GenericForm
      wrapperClassName="h-full w-full"
      cardClassName="shadow-none"
      formClassName="flex flex-col"
      title={!spending.spendingId ? "Add" : "Edit"}
      onSubmit={onSubmit}
      formChildren={
        <>
          <SaveSpendingsModalCategory
            spending={spending}
            categoriesMap={categoriesMap}
          />
          <SaveSpendingsModalAmount spending={spending} />
          <SaveSpendingsModalFormFooter closeModal={closeModal} />
        </>
      }
    />
  );
};

export default SaveSpendingsModalForm;
