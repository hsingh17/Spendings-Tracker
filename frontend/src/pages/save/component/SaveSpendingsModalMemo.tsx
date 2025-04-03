import React, { FC, useState } from "react";
import {
  GenericFormInputProps,
  Nullable,
  Spending,
} from "../../../utils/types";

type SaveSpendingsModalMemoProps = GenericFormInputProps & {
  spending: Nullable<Spending>;
};

const SaveSpendingsModalMemo: FC<SaveSpendingsModalMemoProps> = ({
  name = "memo",
  spending,
}) => {
  const [memo, setMemo] = useState<Nullable<string>>(spending?.memo);
  const inputStyling = memo === null ? "italic font-medium text-slate-500" : "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 255) {
      setMemo(e.target.value);
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Entering input so remove the Optional text
    if (!memo) {
      e.target.value = "";
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Leaving input so make the optional text show up again
    if (!memo) {
      e.target.value = "Optional";
      setMemo(null);
    }
  };

  if (!spending) {
    return <></>;
  }

  return (
    <>
      <div className="w-full flex font-semibold text-slate-500">
        <label>Memo</label>
        <span className="ml-auto">{memo?.length || 0}/255</span>
      </div>

      <div className={"flex flex-row w-full mt-2"}>
        <input
          className={`w-full rounded-s-xl rounded-r-md p-2 border-slate-300 border-2 border-opacity-50 outline-none focus:border-slate-500 ${inputStyling}`}
          type="text"
          id={name}
          name={name}
          value={memo === null || memo === undefined ? "Optional" : memo}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </>
  );
};

export default SaveSpendingsModalMemo;
