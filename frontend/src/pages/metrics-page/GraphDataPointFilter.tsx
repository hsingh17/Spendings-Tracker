import React, { FC } from "react";
import useDetectScreenWidth from "../../hooks/useDetectScreenWidth";
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
  const isMobile = useDetectScreenWidth();
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

  const getListOfPageLimits = (): number[] => {
    const ret = PAGE_LIMITS;
    const graphType = searchParams.get("graph-type");
    if (graphType && graphType === "Bar") {
      return ret.slice(0, isMobile ? 2 : 3);
    } else {
      return ret;
    }
  };

  return (
    <>
      <label className="text-sm font-semibold mb-1">Data Points</label>
      <select
        className="p-2 mb-2 rounded-lg"
        name="data-points"
        value={getCurrentLimit()}
        onChange={(e: React.ChangeEvent) => onChange(e)}
      >
        {getListOfPageLimits().map((limit) => {
          return <option key={limit}>{limit}</option>;
        })}
      </select>
    </>
  );
};

export default GraphDataPointFilter;
