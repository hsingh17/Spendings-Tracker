import { FC } from "react";

type GenericDatePickerProps = {
  defaultDate?: string | null;
  className?: string;
  labelText: string;
  inputName: string;
};

const GenericDatePicker: FC<GenericDatePickerProps> = ({
  defaultDate = "",
  className = "",
  inputName,
  labelText,
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold" htmlFor={inputName}>
        {labelText}
      </label>

      <input
        className="mt-1 w-full border border-gray-300 p-2 rounded"
        type="date"
        defaultValue={defaultDate || ""}
        id={inputName}
        name={inputName}
      />
    </div>
  );
};

export default GenericDatePicker;
