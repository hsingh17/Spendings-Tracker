import React, { Dispatch, FC, SetStateAction } from "react";
import { Constants } from "../../utils/constants";
import { Nullable } from "../../utils/types";

type GraphDataPointFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
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
        defaultValue={getCurrentLimit()}
        onChange={(e: React.ChangeEvent) => onChange(e)}
      >
        {Constants.PAGE_LIMITS.map((limit) => {
          return <option key={limit}>{limit}</option>;
        })}
      </select>
    </>
  );
};

export default GraphDataPointFilter;
