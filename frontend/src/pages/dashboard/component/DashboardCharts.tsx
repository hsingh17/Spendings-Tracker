import { useEffect, useRef, useState } from "react";
import DashboardChartsDesktopView from "./DashboardChartsDesktopView";
import DashboardChartsMobileView from "./DashboardChartsMobileView";

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
        <DashboardChartsDesktopView />
      ) : (
        <DashboardChartsMobileView />
      )}
    </div>
  );
};

export default DashboardCharts;
