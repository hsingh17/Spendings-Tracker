import { FC } from "react";
import { NavbarHeaderTitleProps, NavbarState } from "../utils/types";

const NavbarHeaderTitle: FC<NavbarHeaderTitleProps> = ({ state }) => {
  const isMobile: boolean =
    state === NavbarState.MOBILE_MENU_HIDDEN ||
    state === NavbarState.MOBILE_MENU_SHOWN;

  const mobileStyle: string = isMobile
    ? "text-3xl ml-6"
    : "text-lg ml-3 leading-none";
    
  if (state === NavbarState.NON_MOBILE_COLLAPSED) {
    return <></>;
  }

  return <h1 className={`font-semibold ${mobileStyle}`}>Spendings Tracker</h1>;
};

export default NavbarHeaderTitle;
