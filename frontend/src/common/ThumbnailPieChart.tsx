import useSpendings from "../hooks/useSpendings";
import { CategoricalSpendings } from "../utils/types";
import PieChart from "./PieChart";

const ThumbnailPieChart = () => {
  const searchParams: URLSearchParams = new URLSearchParams([["type", "C"]]);
  const {data: response} = useSpendings<CategoricalSpendings>(searchParams);

  return (
    <PieChart data={response?.data} width={250} height={250} outerRadius={100} innerRadius={25}/>
  )
};

export default ThumbnailPieChart;