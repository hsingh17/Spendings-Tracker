import { useNavigate } from "react-router-dom";
import GraphEmptyStateIcon from "../../assets/components/GraphEmptyStateIcon";
import { SAVE_SPENDINGS_PAGE } from "../../utils/constants";
import DateUtils from "../../utils/date-utils";

const GraphEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-gray-700 flex flex-col items-center p-5">
      <GraphEmptyStateIcon className="w-25 h-25 scale-[0.25]" />
      <div className="text-theme-neutral text-xl text-center -mt-64 font-semibold">
        <h1>There's nothing to show.</h1>
        <h1>
          Try adjusting the filters or create spendings to start visualizing
          your spendings!
        </h1>

        <button
          className="hover:opacity-50 text-theme-neutral font-semibold md:ml-auto bg-theme-cta px-5 py-3 mt-5 rounded-xl"
          onClick={() =>
            navigate(`${SAVE_SPENDINGS_PAGE}/${DateUtils.getCurrentDate()}`)
          }
        >
          Create Spending
        </button>
      </div>
    </div>
  );
};

export default GraphEmptyState;
