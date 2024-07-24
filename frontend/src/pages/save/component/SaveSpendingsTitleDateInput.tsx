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
      className="w-full bg-theme-white border-[0px] border-slate-300 rounded-lg px-2 py-1 text-theme-brand-secondary mt-2 text-center text-xl font-semibold"
      type="date"
      id="spending-date"
      defaultValue={date}
      onChange={(e: React.FormEvent) => handleChange(e)}
    />
  );
};

export default SaveSpendingsTitleDateInput;
