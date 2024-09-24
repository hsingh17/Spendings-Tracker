import { useEffect, useRef, useState } from "react";

// Hardcoded values just seemed to look fine
const INITIAL_SVG_HEIGHT_WIDTH = 1000;
const OUTER_RADIUS = 100;
const INNER_RADIUS = 50;
const STROKE_DASHARRAY = 9990;
const STROKE_DASHOFFSET = 9900;

const LoadingSpinner = () => {
  const ref = useRef<SVGSVGElement>(null);
  const [svgHeight, setSvgHeight] = useState<number>(INITIAL_SVG_HEIGHT_WIDTH);
  const [svgWidth, setSvgWidth] = useState<number>(INITIAL_SVG_HEIGHT_WIDTH);

  if (!svgWidth || !svgHeight) {
    return <></>;
  }

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // Tigthen the SVG's width and height to exactly fit it's contents
    const boundingBox = ref.current.getBBox();
    setSvgHeight(boundingBox.height);
    setSvgWidth(boundingBox.width);
  }, [ref]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-transparent">
      <svg width={svgWidth} height={svgHeight} ref={ref}>
        <g
          style={{
            scale: "1",
            transform: `translate(${svgWidth / 2}px, ${svgHeight / 2}px)`,
            transformOrigin: "center center",
          }}
        >
          <circle className="brightness-200" r={OUTER_RADIUS} fill="#EEEEEE" />

          <circle
            className="animate-spin"
            r={INNER_RADIUS}
            fill="#EEEEEE"
            strokeWidth={2 * (OUTER_RADIUS - INNER_RADIUS)}
            stroke="#00ADB5"
            strokeDasharray={STROKE_DASHARRAY}
            strokeDashoffset={STROKE_DASHOFFSET}
          />

          <circle
            r={INNER_RADIUS}
            fill="#EEEEEE"
            stroke="#EEEEEE"
            strokeWidth={OUTER_RADIUS - INNER_RADIUS}
          />
        </g>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
