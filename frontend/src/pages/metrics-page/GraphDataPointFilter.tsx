import React, { FC } from "react";
import { PAGE_LIMITS } from "../../utils/constants";
import { Nullable } from "../../utils/types";

type GraphDataPointFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const GraphDataPointFilter: FC<GraphDataPointFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const getCurrentLimit = (): number => {
    const params = new URLSearchParams(document.location.search);
    const limitStr: Nullable<string> = params.get("limit");
    return limitStr ? parseInt(limitStr) : 25;
  };

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as typeof e.target & {
      value: number;
    };

    searchParams.set("limit", String(target.value));
    setSearchParams(searchParams);
  };

  return (
    <>
      <label className="text-sm font-semibold mb-1">Data points</label>
      <select
        className="p-2 mb-2 rounded-lg"
        name="data-points"
        value={getCurrentLimit()}
        onChange={(e: React.ChangeEvent) => onChange(e)}
      >
        {PAGE_LIMITS.map((limit) => {
          return <option key={limit}>{limit}</option>;
        })}
      </select>
    </>
  );
};

export default GraphDataPointFilter;
