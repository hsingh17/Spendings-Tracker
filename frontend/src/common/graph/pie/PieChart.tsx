import { PieArcDatum, arc, interpolateCool, pie, scaleSequential } from "d3";
import { FC } from "react";
import { ApiResponse, CategoricalSpendings } from "../../../utils/types";

type PieChartProps = {
  width: number;
  height: number;
  response: ApiResponse<CategoricalSpendings[]>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const PieChart: FC<PieChartProps> = ({ width, height, response }) => {
  const data = response.data;
  if (!data) {
    return <>TODO</>;
  }

  const innerRadius = 0;
  const outerRadius = width / 10;
  const interpolatorScale = scaleSequential()
    .interpolator(interpolateCool)
    .domain([0, data.length]);

  const pieGenerator = pie<CategoricalSpendings>()
    .padAngle(0)
    .value((d) => d.total);

  const arcGenerator = arc<PieArcDatum<CategoricalSpendings>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  return (
    <svg height={height} width={width}>
      <g style={{ transform: `translate(${width / 2}px, ${height / 2}px)` }}>
        {pieGenerator(data).map((d, i) => {
          return <path d={arcGenerator(d) || ""} fill={interpolatorScale(i)} />;
        })}
      </g>
    </svg>
  );
};

export default PieChart;
