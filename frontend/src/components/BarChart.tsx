import {
  Selection,
  max,
  min,
  scaleBand,
  scaleLinear,
  select
} from "d3";
import { FC, useEffect, useRef, useState } from "react";
import { BarChartProps, Nullable } from "../utils/types";

const BarChart: FC<BarChartProps> = ({ data, height, width }) => {
  const svgRef = useRef(null);
  const [selection, setSelection] =
    useState<Nullable<Selection<null, unknown, null, undefined>>>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
      return;
    }

    if (!data) {
      return;
    }

    // X Scale
    const xScale = scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.1);

    // Y scale
    const maxTotal: number | undefined = max<number>(data.map((d) => d.total));
    const minTotal: number | undefined = min<number>(data.map((d) => d.total));
    console.log(minTotal, maxTotal);
    
    const yScale = scaleLinear()
      .domain([minTotal ? minTotal : 0, maxTotal ? maxTotal : 0])
      .range([0, height]);

    // Create bars
    selection
      .selectAll("rect")
      .data(data)
      .join(
        (enter) => enter.append("rect"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("x", d => xScale(d.category)!)
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.total))
      .attr("fill", "black");

  }, [selection, data]);

  return <svg ref={svgRef} height={height} width={width}></svg>;
};

export default BarChart;
