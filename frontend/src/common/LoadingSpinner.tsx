const LoadingSpinner = () => {
  return (
    <svg width={1000} height={1000}>
      <g
        style={{
          transform: `translate(500px, 500px)`,
          transformOrigin: "center center",
        }}
      >
        <circle
          r={25}
          fill="none"
          stroke="red"
          strokeWidth={5}
          strokeDasharray={10000}
          strokeDashoffset={10000} // this number start 10000 -> 0 for spinner animation
        />
      </g>
    </svg>
  );
};

export default LoadingSpinner;
