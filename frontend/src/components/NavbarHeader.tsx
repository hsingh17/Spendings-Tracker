import { FC } from "react";
import { NavbarHeaderProps } from "../utils/types";
import NavbarArrow from "./NavbarArrow";

const NavbarHeader: FC<NavbarHeaderProps> = ({
  mobile,
  collapsed,
  parentSetCollapsed,
}) => {
  const collapsedStyle: string = collapsed ? "flex-col" : "flex-row";

  return (
    <div className={`flex ${collapsedStyle} items-center`}>
      <div className="w-10 h-10 bg-theme-cta"></div> {/*TODO*/}
      
      {collapsed ? (
        <></>
      ) : (
        <h1 className="font-bold text-xl ml-3">Spendings Tracker</h1>
      )}

      <NavbarArrow
        mobile={mobile}
        collapsed={collapsed}
        parentSetCollapsed={parentSetCollapsed}
      />
    </div>
  );
};

export default NavbarHeader;
