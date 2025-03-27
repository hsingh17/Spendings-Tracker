import { useEffect, useRef, useState } from "react";

const DESKTOP_VIEW_MIN_WIDTH = 1000;
const DashboardCharts = () => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (!ref || !ref.current) {
      return;
    }
    console.log(ref.current.clientWidth);

    setIsDesktopView(ref.current.clientWidth >= DESKTOP_VIEW_MIN_WIDTH);
  };

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  return (
    <div className="w-full h-full" ref={ref}>
      {isDesktopView ? (
        <div className="flex flex-row w-full h-full">
          <div className="bg-green-600 w-2/5 h-full mr-2"></div>
          <div className="flex flex-col w-3/5 h-full">
            <div className="bg-purple-600 h-full mb-2"></div>
            <div className="bg-orange-600 h-full"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full justify-between">
          <div className="bg-green-600 h-[1000px] mb-2"></div>
          <div className="bg-purple-600 h-[1000px] mb-2"></div>
          <div className="bg-orange-600 h-[1000px]"></div>
        </div>
      )}
    </div>
  );
};

export default DashboardCharts;
