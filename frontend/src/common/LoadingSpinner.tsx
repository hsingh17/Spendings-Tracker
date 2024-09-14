const LoadingSpinner = () => {
  const height = 1000;
  const width = 1000;
  const outerRadius = 100;
  const innerRadius = 50;
  return (
    <svg width={width} height={height}>
      <g
        style={{
          scale: "1",
          transform: `translate(${width / 2}px, ${height / 2}px)`,
          transformOrigin: "center center",
        }}
      >
        <circle className="brightness-200" r={outerRadius} fill="#EEEEEE" />
        <circle
          className="animate-spin"
          r={innerRadius}
          fill="#EEEEEE"
          strokeWidth={1.5 * (outerRadius - innerRadius)}
          stroke="#00ADB5"
          strokeDasharray={9990}
          strokeDashoffset={9920}
        />
        <circle
          r={innerRadius}
          fill="#EEEEEE"
          stroke="#EEEEEE"
          strokeWidth={outerRadius - innerRadius}
        />
      </g>
    </svg>
  );
};

export default LoadingSpinner;
