import { FC } from "react";
import Logo from "../../assets/components/Logo";
import MiniLogo from "../../assets/components/MiniLogo";
import { NavbarHeaderTitleProps, NavbarState } from "../../utils/types";

const NavbarHeaderTitle: FC<NavbarHeaderTitleProps> = ({ state }) => {
  const isMobile: boolean =
    state === NavbarState.MOBILE_MENU_HIDDEN ||
    state === NavbarState.MOBILE_MENU_SHOWN;

  if (state === NavbarState.NON_MOBILE_COLLAPSED) {
    return <MiniLogo className="bg-white rounded-full h-14 w-14" />;
  }

  return isMobile ? (
    <MiniLogo className="bg-white rounded-full h-14 w-14 ml-5" />
  ) : (
    <Logo className="bg-white h-24 w-28 rounded-full" />
  );
};

export default NavbarHeaderTitle;
