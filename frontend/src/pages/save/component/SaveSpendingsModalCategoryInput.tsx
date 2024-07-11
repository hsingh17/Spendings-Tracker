import { FC } from "react";
import { CategoriesMap } from "../../../utils/types";

type SaveSpendingsModalFormProps = { categoriesMap: CategoriesMap };
const SaveSpendingsModalCategoryInput: FC<SaveSpendingsModalFormProps> = ({
  categoriesMap,
}) => {
  return (
    <div className="flex flex-col mb-3 mt-3">
      <label className="font-semibold text-slate-500">Category</label>
      <select className="p-2 mt-2 rounded-lg ">
        <option selected disabled hidden>
          Choose category
        </option>
        {Object.keys(categoriesMap).map((key) => {
          return (
            <option key={key} value={key}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SaveSpendingsModalCategoryInput;
