import useSpendings from "../../../hooks/useSpendings";
import { SpendingListRow } from "../../../utils/types";
import NoSpendingActivity from "./NoSpendingActivity";
import Carousel from "../../../common/Carousel";
import Card from "../../../common/Card";
import DateUtils from "../../../utils/date-utils";
import MoneyUtils from "../../../utils/money-utils";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../../utils/constants";
import { ReactComponent as RightArrow } from "../../../assets/raw/right-arrow.svg";

const RecentSpendingsCarousel = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams([["limit", "7"]]);
  let { data: response } = useSpendings<SpendingListRow>(searchParams);

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
          <div
            className="hover: cursor-pointer"
            onClick={() =>
              navigate(
                `${Constants.SAVE_SPENDINGS_PAGE}/${spendingListRow.date}`
              )
            }
          >
            <Card customStyles="mr-5 w-60 h-fit p-3">
              <p className="font-medium text-theme-brand mb-auto">
                {DateUtils.formatDateUS(spendingListRow.date)}
              </p>
              <p className="font-semibold text-theme-cta text-xl mb-auto break-words">
                {MoneyUtils.formatMoneyUsd(spendingListRow.total)}
              </p>
            </Card>
          </div>
        );
      })}

      <div
        className="w-40 hover:cursor-pointer flex flex-row items-center"
        onClick={() => navigate(`${Constants.VIEW_SPENDINGS_PAGE}`)}
      >
        <p className="font-semibold text-theme-cta text-2xl">
          View all
        </p>
        <RightArrow className="w-10 h-10" stroke="#00ADB5" />
      </div>
    </Carousel>
  );
};

export default RecentSpendingsCarousel;
