import { PieArcDatum, Selection, arc, interpolateCool, pie, scaleSequential, select } from "d3";
import { FC, useEffect, useRef, useState } from "react";
import { CategoricalSpendings, Nullable, PieChartProps } from "../../../utils/types";

const PieChart: FC<PieChartProps> = ({ data, height, width, innerRadius, outerRadius }) => {
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

    // Use interpolator since we can have variable number of categories
    const interpolatorScale = scaleSequential()
      .interpolator(interpolateCool)
      .domain([0, data.length]);

    // Will be used to compute arcs from data
    const pieGenerator = pie<CategoricalSpendings>()
      .padAngle(0)
      .value(d => d.total);

    // Will be used to draw the arcs 
    const arcGenerator = arc<PieArcDatum<CategoricalSpendings>>()
      .innerRadius(innerRadius)      
      .outerRadius(outerRadius);

    // Create an svg group
    const svgGroup = selection
      .selectAll("g")
      .data([true]) // Data in this case doesn't matter we just want a svg group element
      .join(
        enter => enter.append("g"),
        update => update.attr("class", "updated"),
        exit => exit.remove()
      )
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    svgGroup
      .selectAll("path")
      .data(pieGenerator(data)) 
      .join(
        (enter) => enter.append("path"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("d", arcGenerator)
      .style("fill", (_, i) => interpolatorScale(i));

  }, [selection, data]);

  return <svg ref={svgRef} height={height} width={width}></svg>;
};

export default PieChart;