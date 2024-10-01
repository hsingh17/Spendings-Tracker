import { useNavigate } from "react-router-dom";
import { SAVE_SPENDINGS_PAGE } from "../../../utils/constants";
import DateUtils from "../../../utils/date-utils";

const NoSpendingActivity = () => {
  const navigate = useNavigate();
  return (
    <h1 className="font-medium text-2xl">
      No recent spending activity found!{" "}
      <a
        className="text-theme-cta font-semibold hover:cursor-pointer underline"
        onClick={() =>
          navigate(
            `${SAVE_SPENDINGS_PAGE}/${DateUtils.getCurrentDateAsRFC3339()}`,
          )
        }
      >
        Let's fix that!
      </a>
    </h1>
  );
};

export default NoSpendingActivity;
