import { FC } from "react";
import { useNavigate } from "react-router-dom";

type SaveSpendingsFooterButtonsProps = {
  isDisabled: boolean;
  isCreateMode: boolean;
  handleSubmit: (e: React.MouseEvent) => void;
};

const SaveSpendingsFooterButtons: FC<SaveSpendingsFooterButtonsProps> = ({
  isDisabled,
  isCreateMode,
  handleSubmit,
}) => {
  const navigate = useNavigate();

  return (
    <div className="ml-auto mt-7 px-3">
      <button
        className="mr-4 text-slate-600 text-lg"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
      <button
        className="bg-theme-cta px-5 py-2 text-white font-semibold rounded-xl hover:cursor-pointer hover:brightness-110 text-lg disabled:opacity-25"
        disabled={isDisabled}
        onClick={(e: React.MouseEvent) => handleSubmit(e)}
      >
        {isCreateMode ? "Create" : "Update"}
      </button>
    </div>
  );
};

export default SaveSpendingsFooterButtons;
