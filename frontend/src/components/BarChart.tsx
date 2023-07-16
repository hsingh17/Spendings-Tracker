import {
  Selection,
  extent,
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
    const yScale = scaleLinear()
      .domain(extent(data, (d) => d.total) as [number, number])
      .range([0, height]);

    // Create bars
    selection
      .selectAll("rect")
      .data(data)
      .join(
        enter => enter.append("rect"),
        update => update.attr("class", "updated"),
        exit => exit.remove()
      )
      .attr("x", d => xScale(d.category)!)
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.total))
      .attr("fill", "black");

  }, [selection, data]);

  return <svg ref={svgRef} height={height} width={width}></svg>;
};

export default BarChart;
