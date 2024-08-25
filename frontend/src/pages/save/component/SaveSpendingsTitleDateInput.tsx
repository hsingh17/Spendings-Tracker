import { FC } from "react";

type SaveSpendingsTitleDateInputProps = {
  date: string;
  handleDateChange: (date: string) => void;
};

const SaveSpendingsTitleDateInput: FC<SaveSpendingsTitleDateInputProps> = ({
  date,
  handleDateChange,
}) => {
  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      value: string;
    };

    handleDateChange(target.value);
  };

  return (
    <input
      className="w-fit mr-auto rounded-lg px-2 py-1 text-theme-brand-secondary text-center text-lg -mt-2 -ml-3 md:-mt-8 md:-ml-5 font-semibold mb-7 hover:cursor-pointer"
      type="date"
      id="spending-date"
      defaultValue={date}
      onChange={(e: React.FormEvent) => handleChange(e)}
    />
  );
};

export default SaveSpendingsTitleDateInput;
