import useSpendings from "../../hooks/useSpendings";
import { CategoricalSpendings } from "../../utils/types";
import BarChart from "./bar/Bars";

const ThumbnailBarChart = () => {
  const searchParams: URLSearchParams = new URLSearchParams([["type", "C"]]);
  const { data: response } = useSpendings<CategoricalSpendings>(searchParams);

  return <BarChart data={response?.data} width={200} height={200} />;
};

export default ThumbnailBarChart;
