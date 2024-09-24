import ShimmerLoadingBox from "../../../common/ShimmerLoadingBox";

const DUMMY_SPENDINGS = Array(25).fill({});

const SpendingsTableLoadingShimmerRow = () => {
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

const SpendingsTableLoadingShimmer = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <table className="mt-5 table-fixed w-11/12 border-collapse">
        {DUMMY_SPENDINGS.map(() => {
          return <SpendingsTableLoadingShimmerRow />;
        })}
      </table>
    </div>
  );
};

export default SpendingsTableLoadingShimmer;
