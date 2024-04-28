import { useEffect, useState } from "react";
import { MOBILE_SCREEN_WIDTH } from "../utils/constants";

export default function useDetectMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth <= MOBILE_SCREEN_WIDTH,
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth <= MOBILE_SCREEN_WIDTH);
  };

  useEffect(() => {
    window.addEventListener("resize", () => handleResize());

    return window.removeEventListener("resize", () => handleResize());
  }, []);

  return isMobile;
}
