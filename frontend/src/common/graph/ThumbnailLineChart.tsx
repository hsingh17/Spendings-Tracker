import useSpendings from "../../hooks/useSpendings";
import { SpendingListRow } from "../../utils/types";
import LineChart from "./LineChart";

const ThumbnailLineChart = () => {
  const searchParams: URLSearchParams = new URLSearchParams([
    ["type", "N"],
    ["group-by", "D"]
  ]);
  const {data: response} = useSpendings<SpendingListRow>(searchParams);

  return (
    <LineChart data={response?.data} width={500} height={500} groupBy={searchParams.get("group-by")!} />
  )
};

export default ThumbnailLineChart;