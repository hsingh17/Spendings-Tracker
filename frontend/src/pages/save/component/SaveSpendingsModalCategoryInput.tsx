import React, { FC, useState } from "react";
import useFormValidate from "../../../hooks/useFormValidate";
import {
  CategoriesMap,
  FormValidator,
  GenericFormInputProps,
} from "../../../utils/types";

type SaveSpendingsModalFormProps = GenericFormInputProps & {
  categoriesMap: CategoriesMap;
  addformvalidators?: (formFieldName: string, validate: () => boolean) => void;
};

const DEFAULT_SELECT_CLASS_NAME = "opacity-60 font-semibold";

function getValidators(categoriesMap: CategoriesMap): FormValidator[] {
  return [
    {
      msg: `Must choose a category`,
      validate: (category: string): boolean =>
        Object.keys(categoriesMap).indexOf(category) !== -1,
    },
  ];
}
const SaveSpendingsModalCategoryInput: FC<SaveSpendingsModalFormProps> = ({
  name = "category",
  categoriesMap,
  addformvalidators: addFormValidators,
}) => {
  const { setVal, errs } = useFormValidate(
    name,
    getValidators(categoriesMap),
    addFormValidators,
  );

  const [selectClassName, setSelectClassName] = useState<string>(
    DEFAULT_SELECT_CLASS_NAME,
  );

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Want "Choose category" default option to have special styling
    // so for the first onChange event, just set className to be empty string and since
    // user can never choose "Choose category" after changing once, this works
    if (selectClassName === "") {
      return;
    }
    setSelectClassName("");
    setVal(e.target.value);
  };

  return (
    <div className="flex flex-col mb-3 mt-3">
      <label className="font-semibold text-slate-500">Category</label>
      <select
        className={`p-2 mt-2 rounded-lg border-4 ${selectClassName} ${errs.length > 0 ? "border-red-500" : ""}`}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e)}
        name={name}
        defaultValue={"Choose category"}
      >
        <option value="Choose category" disabled hidden>
          Choose category
        </option>
        {Object.keys(categoriesMap).map((key) => {
          return (
            <option key={key} value={key} className="font-normal text-black">
              {key}
            </option>
          );
        })}
      </select>

      <span className="text-red-600 font-semibold">
        {errs.length > 0 ? errs[0].errMsg : ""}
      </span>
    </div>
  );
};

export default SaveSpendingsModalCategoryInput;
