import { FC } from "react";
import { ReactComponent as HamburgerIcon } from "../../assets/raw/hamburger-icon.svg";
import {
  NavbarAction,
  NavbarHamburgerIconProps,
  NavbarState,
} from "../../utils/types";

const NavbarHamburgerIcon: FC<NavbarHamburgerIconProps> = ({
  state,
  transitionState,
}) => {
  const isMobile: boolean =
    state === NavbarState.MOBILE_MENU_HIDDEN ||
    state === NavbarState.MOBILE_MENU_SHOWN;

  if (!isMobile) {
    return <></>;
  }

  return (
    <HamburgerIcon
      onClick={() =>
        transitionState(
          state === NavbarState.MOBILE_MENU_SHOWN
            ? NavbarAction.MOBILE_HIDE_MENU
            : NavbarAction.MOBILE_SHOW_MENU
        )
      }
      className="hover:cursor-pointer w-10 h-10 ml-auto mr-10 scale-125"
      stroke="white"
    />
  );
};

export default NavbarHamburgerIcon;
