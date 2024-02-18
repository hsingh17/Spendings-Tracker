import useSpendings from "../../hooks/useSpendings";
import { SpendingListRow } from "../../utils/types";

const ThumbnailLineChart = () => {
  const searchParams: URLSearchParams = new URLSearchParams([
    ["type", "N"],
    ["group-by", "D"],
  ]);
  const { data: response } = useSpendings<SpendingListRow>(searchParams);

  if (!response || !response.ok || !response.data) {
    return <>TODO</>;
  }
  return <></>;
  // return <LineChart data={response.data} width={500} height={500} />;
};

export default ThumbnailLineChart;
