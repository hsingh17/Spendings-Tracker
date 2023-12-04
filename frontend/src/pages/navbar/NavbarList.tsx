import { NavbarListProps, NavbarState } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import NavbarSublist from "./NavbarSublist";
import { FC } from "react";

const NavbarList: FC<NavbarListProps> = ({ state, items, transitionState }) => {
  if (state === NavbarState.MOBILE_MENU_HIDDEN) {
    return <></>;
  }

  return (
    <ul className="p-5 h-screen w-screen md:p-0 md:mt-10 md:h-fit md:w-fit bg-theme-brand-secondary">
      {items.map((item, index) => (
        <NavbarSublist key={index} item={item} state={state} />
      ))}
    </ul>
  );
};

export default NavbarList;
