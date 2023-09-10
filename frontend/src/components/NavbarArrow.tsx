import { FC } from "react";
import { NavbarArrowProps } from "../utils/types";
import { ReactComponent as LeftArrow } from "../assets/raw/left-arrow.svg";
import { ReactComponent as RightArrow } from "../assets/raw/right-arrow.svg";

const NavbarArrow: FC<NavbarArrowProps> = ({
  collapsed,
  parentSetCollapsed,
}) => {
  return (
    <>
      {collapsed ? (
        <RightArrow
          className="w-10 h-10 mb-7 hover:cursor-pointer -order-1"
          onClick={() => parentSetCollapsed(false)}
          stroke="gray"
        />
      ) : (
        <LeftArrow
          className="w-10 h-10 ml-auto hover:cursor-pointer"
          onClick={() => parentSetCollapsed(true)}
          stroke="gray"
        />
      )}
    </>
  );
};

export default NavbarArrow;
