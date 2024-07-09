import { FC } from "react";

type SaveSpendingsModalFormFooterProps = {
  setShow: () => void;
};

const SaveSpendingsModalFormFooter: FC<SaveSpendingsModalFormFooterProps> = ({
  setShow,
}) => {
  return (
    <div className="flex flex-row justify-end w-full mt-3">
      <button
        className="text-gray-500 mr-5 text-sm md:text-base"
        onClick={setShow}
      >
        Cancel
      </button>

      <button className="bg-theme-cta text-theme-neutral rounded-xl px-3 py-1 font-semibold">
        Save
      </button>
    </div>
  );
};

export default SaveSpendingsModalFormFooter;
