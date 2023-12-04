import { useNavigate } from "react-router-dom";
import { Constants } from "../../../utils/constants";
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
            `${Constants.SAVE_SPENDINGS_PAGE}/${DateUtils.getCurrentDate()}`
          )
        }
      >
        Let's fix that!
      </a>
    </h1>
  );
};

export default NoSpendingActivity;
