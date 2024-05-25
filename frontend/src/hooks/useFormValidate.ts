import { useEffect, useState } from "react";
import { FormValidator, Nullable } from "../utils/types";

export default function useFormValidate(
  formFieldName: string,
  validators: FormValidator[],
  addFormValidators?: (formFieldName: string, validate: () => boolean) => void,
) {
  const [val, setVal] = useState<string>("");
  const [errMsg, setErrMsg] = useState<Nullable<string>>();

  useEffect(() => {
    const validate = () => {
      let valid = true;

      for (const validator of validators) {
        if (!validator.validate(val)) {
          valid = false;
          setErrMsg(validator.msg);
          break;
        }
      }

      if (valid) {
        // Reset error messages
        setErrMsg(null);
      }

      return valid;
    };

    if (addFormValidators) {
      addFormValidators(formFieldName, validate);
    }
  }, [val]);

  return {
    setVal: setVal,
    errMsg: errMsg,
  };
}
