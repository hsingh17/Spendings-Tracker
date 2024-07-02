import { FC } from "react";
import { CategoriesMap, SpendingFormInput } from "../../../utils/types";
import TableEmptyState from "../../view/component/TableEmptyState";
import SaveSpendingsFormRow from "./SaveSpendingsFormRow";

type SaveSpendingsFormListProps = {
  spendings: Array<SpendingFormInput>;
  categoriesMap: CategoriesMap;
  handleDeleteRow: (idx: number) => void;
};

const SaveSpendingsFormList: FC<SaveSpendingsFormListProps> = ({
  spendings,
  categoriesMap,
  handleDeleteRow,
}) => {
  const countSpendingsToDisplay = (spendings: Array<SpendingFormInput>) =>
    spendings.filter((spending) => !spending.delete).length;

  if (!spendings || countSpendingsToDisplay(spendings) === 0) {
    return <TableEmptyState />;
  }

  return (
    <div className="w-full h-full overflow-x-scroll">
      <div className="p-5 flex flex-col items-center">
        {spendings.map((spending: SpendingFormInput, idx: number) => {
          return (
            <SaveSpendingsFormRow
              key={idx}
              idx={idx}
              spending={spending}
              categoriesMap={categoriesMap}
              handleDeleteRow={handleDeleteRow}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SaveSpendingsFormList;
