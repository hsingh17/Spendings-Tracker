import React, { useEffect } from "react";
import { Nullable } from "../utils/types";

export default function useDetectOutsideComponent(
  refs: Array<React.RefObject<HTMLElement>>,
  handler: (e: Nullable<React.MouseEvent>, open: boolean) => void,
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const eventOutsideAllRefs: boolean = refs.every(
        (ref) => ref && ref.current && !ref.current.contains(e.target as Node),
      );

      if (eventOutsideAllRefs) {
        // The event is happening outside all the refs
        handler(null, false);
        return;
      }
    };

    document.addEventListener("mousedown", (e: MouseEvent) => handleClick(e));

    return () => {
      document.removeEventListener("mousedown", (e: MouseEvent) =>
        handleClick(e),
      );
    };
  }, [refs]);
}
