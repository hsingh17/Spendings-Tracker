import ShimmerLoadingBox from "../../../common/ShimmerLoadingBox";

const SpendingsTableLoadingShimmer = () => {
  return (
    <tr className="border-gray-300 leading-[3rem]">
      {[...Array(3).keys()].map((val) => (
        <td key={val}>
          <ShimmerLoadingBox />
        </td>
      ))}
    </tr>
  );
};

export default SpendingsTableLoadingShimmer;
