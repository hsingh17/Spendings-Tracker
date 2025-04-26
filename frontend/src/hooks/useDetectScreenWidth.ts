import { useEffect, useState } from "react";
import { MOBILE_SCREEN_WIDTH } from "../utils/constants";

export default function useDetectScreenWidth(threshold: number = MOBILE_SCREEN_WIDTH) {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth <= threshold,
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth <= threshold);
  };

  useEffect(() => {
    window.addEventListener("resize", () => handleResize());

    return window.removeEventListener("resize", () => handleResize());
  }, []);

  return isMobile;
}
