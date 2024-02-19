import { useEffect, useState } from "react";
import { MOBILE_SCREEN_WIDTH } from "../utils/constants";

export default function useDetectMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth <= MOBILE_SCREEN_WIDTH,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_SCREEN_WIDTH);
    };

    window.addEventListener("resize", () => handleResize());

    return window.removeEventListener("resize", () => handleResize());
  }, []);

  return isMobile;
}
