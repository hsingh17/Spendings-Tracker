import {
	extent,
  line,
  max,
  min,
  scaleLinear,
  scaleTime,
  select,
  Selection,
  timeParse,
} from "d3";
import { LineChartProps, Nullable, SpendingListRow } from "../utils/types";
import { FC, useEffect, useRef, useState } from "react";
import { Constants } from "../utils/constants";

const LineChart: FC<LineChartProps> = ({ data, height, width, groupBy }) => {
  const svgRef = useRef(null);
  const [selection, setSelection] = useState<Nullable<Selection<null, unknown, null, undefined>>>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
      return;
    }

    if (!data) {
      return;
    }

		// Date parser
		const parser = timeParse(Constants.ISO_FORMAT);

    // X Scale
    const xScale = scaleTime()
      .domain(extent(data, (d: SpendingListRow) => parser(d.date)) as [Date, Date])
      .range([0, width]);

    // Y scale
    const yScale = scaleLinear()
      .domain(extent(data, (d) => d.total) as [number, number])
      .range([0, height]);

    selection
      .selectAll("path")
      .data([data]) // [data] not data since we want to bind a path element to ALL the data not each individual data point
      .join(
        (enter) => enter.append("path"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", line<SpendingListRow>()
          .x((d) => xScale(parser(d.date)!))
          .y((d) => yScale(d.total))
      );
  }, [selection, data]);

  return <svg ref={svgRef} height={height} width={width}></svg>;
};

export default LineChart;
