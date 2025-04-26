import { FC } from "react";
import { NavbarHeaderProps, NavbarState } from "../../utils/types";
import NavbarArrow from "./NavbarArrow";
import NavbarHamburgerIcon from "./NavbarHamburgerIcon";
import NavbarHeaderTitle from "./NavbarHeaderTitle";

const NavbarHeader: FC<NavbarHeaderProps> = ({ state, transitionState }) => {
  const collapsedStyle: string =
    state === NavbarState.NON_MOBILE_COLLAPSED ? "flex-col" : "flex-row";

  return (
    <div className={`flex ${collapsedStyle} items-center h-full md:h-fit`}>
      <NavbarHeaderTitle state={state} />
      <NavbarHamburgerIcon state={state} transitionState={transitionState} />
      <NavbarArrow state={state} transitionState={transitionState} />
    </div>
  );
};

export default NavbarHeader;
