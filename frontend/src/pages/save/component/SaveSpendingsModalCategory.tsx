import React, { FC, useEffect, useState } from "react";
import GenericInputFieldError from "../../../common/form/GenericInputFieldError";
import useFormValidate from "../../../hooks/useFormValidate";
import {
  CategoriesMap,
  FormValidator,
  GenericFormInputProps,
  Nullable,
  Spending,
} from "../../../utils/types";
import SpendingCategoryDropdown from "./SpendingCategoryDropdown";

type SaveSpendingsModalFormProps = GenericFormInputProps & {
  spending: Nullable<Spending>;
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
const SaveSpendingsModalCategory: FC<SaveSpendingsModalFormProps> = ({
  name = "category",
  categoriesMap,
  spending,
  addformvalidators: addFormValidators,
}) => {
  const { setVal, errs } = useFormValidate(
    name,
    getValidators(categoriesMap),
    addFormValidators
  );
  const hasInputError = errs.length > 0 && !errs[0].valid;

  const [selectClassName, setSelectClassName] = useState<string>(
    spending?.category || DEFAULT_SELECT_CLASS_NAME
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

  useEffect(() => {
    setVal(spending?.category || "");
  }, [spending]);

  if (!spending) {
    return <></>;
  }

  return (
    <div className="flex flex-col mb-3 mt-3">
      <SpendingCategoryDropdown
        className={selectClassName}
        name={name}
        hasInputError={hasInputError}
        categoriesMap={categoriesMap}
        spending={spending}
        onChange={onChange}
      />

      <GenericInputFieldError err={errs[0]} asListElement={false} />
    </div>
  );
};

export default SaveSpendingsModalCategory;
