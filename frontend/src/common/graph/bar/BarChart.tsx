import { FC } from "react";
import {
  ApiResponse,
  SpendingListRowBarChart,
  SpendingsPage,
} from "../../../utils/types";
import Bars from "./Bars";

type BarChartProps = {
  width: number;
  height: number;
  response: ApiResponse<SpendingsPage<SpendingListRowBarChart>>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const BarChart: FC<BarChartProps> = ({ response, height, width }) => {
  const data = response.data?.spendingPage.content;
  if (!data || !data.length) {
    // This component won't get rendered if there's no data.
    // So just doing this to satisfy Typescript.
    return <></>;
  }

  return (
    <div className="relative">
      <svg height={height} width={width}>
        <Bars spendings={data} height={height} width={width} />
      </svg>
    </div>
  );
};

export default BarChart;
