import { FC } from "react";
import ShimmerLoadingBox from "../../../common/ShimmerLoadingBox";

const DUMMY_SPENDINGS = Array(25).fill({});
type SpendingsTableLoadingShimmerRowProps = {
  parentIdx: number;
};

const SpendingsTableLoadingShimmerRow: FC<
  SpendingsTableLoadingShimmerRowProps
> = ({ parentIdx }) => {
  return (
    <tr className="border-gray-300 leading-[3rem]">
      {[...Array(3).keys()].map((_, idx) => (
        <td key={3 * parentIdx + idx}>
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
        <tbody>
          {DUMMY_SPENDINGS.map((_, idx) => {
            return (
              <SpendingsTableLoadingShimmerRow key={idx} parentIdx={idx} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SpendingsTableLoadingShimmer;
