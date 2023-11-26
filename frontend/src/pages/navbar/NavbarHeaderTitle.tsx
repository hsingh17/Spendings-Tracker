import { FC } from "react";
import { NavbarHeaderTitleProps, NavbarState } from "../../utils/types";

const NavbarHeaderTitle: FC<NavbarHeaderTitleProps> = ({ state }) => {
  if (state === NavbarState.NON_MOBILE_COLLAPSED) {
    return <></>;
  }

  return <h1 className={`font-semibold ml-6 text-2xl sm:text-3xl md:text-lg md:ml-3 md:leading-none`}>Spendings Tracker</h1>;
};

export default NavbarHeaderTitle;
