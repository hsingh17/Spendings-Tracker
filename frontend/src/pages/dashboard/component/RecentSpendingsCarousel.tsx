import { useNavigate } from "react-router-dom";
import { ReactComponent as RightArrow } from "../../../assets/raw/right-arrow.svg";
import Carousel from "../../../common/Carousel";
import useSpendings from "../../../hooks/useSpendings";
import { Constants } from "../../../utils/constants";
import { SpendingListRow } from "../../../utils/types";
import NoSpendingActivity from "./NoSpendingActivity";
import RecentSpendingsCard from "./RecentSpendingsCard";
const SEARCH_PARAMS = new URLSearchParams([["limit", "7"]]);

const RecentSpendingsCarousel = () => {
  const navigate = useNavigate();
  let { data: response } = useSpendings<SpendingListRow>(SEARCH_PARAMS);

  if (!response || !response.ok) {
    return (
      <h1 className="font-medium text-2xl text-red-600">
        Error fetching recent spending activity!
      </h1>
    );
  }

  if (!response.data || response.data.length === 0) {
    return <NoSpendingActivity />;
  }

  return (
    <Carousel>
      {response.data.map((spendingListRow: SpendingListRow) => {
        return (
          <RecentSpendingsCard
            key={spendingListRow.date}
            spendingListRow={spendingListRow}
          />
        );
      })}

      <div
        className="w-40 flex flex-row items-center text-center hover:cursor-pointer hover:opacity-50"
        onClick={() => navigate(`${Constants.VIEW_SPENDINGS_PAGE}`)}
      >
        <p className="font-semibold text-theme-cta text-2xl">View all</p>
        <RightArrow className="w-10 h-10" stroke="#00ADB5" />
      </div>
    </Carousel>
  );
};

export default RecentSpendingsCarousel;
