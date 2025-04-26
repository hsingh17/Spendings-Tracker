import { FC } from "react";
import { ReactComponent as LeftArrow } from "../../assets/raw/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/raw/right-arrow.svg";
import { NavbarAction, NavbarArrowProps, NavbarState } from "../../utils/types";

const NavbarArrow: FC<NavbarArrowProps> = ({ state, transitionState }) => {
  if (
    state === NavbarState.MOBILE_MENU_HIDDEN ||
    state === NavbarState.MOBILE_MENU_SHOWN
  ) {
    return <></>;
  }

  return (
    <>
      {state === NavbarState.NON_MOBILE_COLLAPSED ? (
        <RightArrow
          className="w-10 h-10 mb-7 hover:cursor-pointer -order-1"
          onClick={() => transitionState(NavbarAction.NON_MOBILE_EXPAND)}
          stroke="gray"
        />
      ) : (
        <LeftArrow
          className="w-10 h-10 ml-auto hover:cursor-pointer"
          onClick={() => transitionState(NavbarAction.NON_MOBILE_COLLAPSE)}
          stroke="gray"
        />
      )}
    </>
  );
};

export default NavbarArrow;
