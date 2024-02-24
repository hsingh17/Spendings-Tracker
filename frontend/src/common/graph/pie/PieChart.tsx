import { PieArcDatum, arc, interpolateRgb, pie, scaleSequential } from "d3";
import { FC } from "react";
import useDetectMobile from "../../../hooks/useDetectMobile";
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

  const isMobile = useDetectMobile();
  const innerRadius = height / 4 + (isMobile ? 10 : 25);
  const outerRadius = height / 2 - (isMobile ? 10 : 100);
  const interpolatorScale = scaleSequential()
    .interpolator(interpolateRgb("#EEEEEE", "#00ADB5"))
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
          return (
            <path
              className="hover:cursor-pointer"
              d={arcGenerator(d) || ""}
              fill={interpolatorScale(i)}
              stroke="#374151"
              strokeWidth={3}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default PieChart;
