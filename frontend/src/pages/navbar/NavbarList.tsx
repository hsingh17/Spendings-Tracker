import { FC } from "react";
import { NavbarListItem, NavbarState } from "../../utils/types";
import NavbarSublist from "./NavbarSublist";

type NavbarListProps = {
  state: NavbarState;
  items: NavbarListItem[];
};

const NavbarList: FC<NavbarListProps> = ({ state, items }) => {
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
