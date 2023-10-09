import { FC } from "react";
import { NavbarHeaderProps, NavbarState } from "../utils/types";
import NavbarArrow from "./NavbarArrow";
import NavbarHamburgerIcon from "./NavbarHamburgerIcon";
import NavbarHeaderTitle from "./NavbarHeaderTitle";

const NavbarHeader: FC<NavbarHeaderProps> = ({ state, transitionState }) => {
  const isMobile: boolean =
    state === NavbarState.MOBILE_MENU_HIDDEN ||
    state === NavbarState.MOBILE_MENU_SHOWN;

  const collapsedStyle: string =
    state === NavbarState.NON_MOBILE_COLLAPSED ? "flex-col" : "flex-row";

  return (
    <div className={`flex ${collapsedStyle} items-center h-full md:h-fit`}>
      {
        isMobile ? (
          <></>
        ) : (
          <div className="w-10 h-10 bg-theme-cta"></div>
        ) /*TODO*/
      }
      <NavbarHeaderTitle state={state} />
      <NavbarHamburgerIcon state={state} transitionState={transitionState} />
      <NavbarArrow state={state} transitionState={transitionState} />
    </div>
  );
};

export default NavbarHeader;
