import { useNavigate } from "react-router-dom";
import CustomDayJs from "../../../config/DayJsConfig";
import { DATE_ISO_FORMAT, SAVE_SPENDINGS_PAGE } from "../../../utils/constants";

const NoSpendingActivity = () => {
  const navigate = useNavigate();
  return (
    <h1 className="font-medium text-2xl">
      No recent spending activity found!{" "}
      <a
        className="text-theme-cta font-semibold hover:cursor-pointer underline"
        onClick={() =>
          navigate(
            `${SAVE_SPENDINGS_PAGE}/${CustomDayJs().format(DATE_ISO_FORMAT)}`,
          )
        }
      >
        Let's fix that!
      </a>
    </h1>
  );
};

export default NoSpendingActivity;
