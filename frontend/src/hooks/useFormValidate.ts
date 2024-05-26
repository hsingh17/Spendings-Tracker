import { useCallback, useEffect, useState } from "react";
import { FormError, FormValidator } from "../utils/types";

export default function useFormValidate(
  formFieldName: string,
  validators: FormValidator[],
  addFormValidators?: (formFieldName: string, validate: () => boolean) => void,
) {
  const [val, setVal] = useState<string>("");
  const [errs, setErrs] = useState<FormError[]>([]);

  // TODO: This kind of hacky. The only reason this is needed
  // is because PasswordInput needs realtime validation
  const validate = useCallback(
    (newVal?: string) => {
      const validateVal = newVal === undefined ? val : newVal;
      let valid = true;
      const newErrs: FormError[] = [];

      for (const validator of validators) {
        const formErr: FormError = {
          errMsg: validator.msg,
          valid: validator.validate(validateVal),
        };

        valid &&= formErr.valid;

        newErrs.push(formErr);
      }

      setErrs(newErrs);
      return valid;
    },
    [val, validators, setErrs],
  );

  useEffect(() => {
    if (addFormValidators) {
      addFormValidators(formFieldName, validate);
    }
  }, [val]);

  return {
    errs: errs,
    setVal: setVal,
    validate: validate,
  };
}
