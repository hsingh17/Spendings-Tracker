import { FC } from "react";
import { NavbarState, NavbarSublistProps } from "../utils/types";
import NavbarSublistItem from "./NavbarSublistItem";
import Navbar from "./Navbar";

const NavbarSublist: FC<NavbarSublistProps> = ({ item, state }) => {
  return (
    <li className="last:mt-16">
      {state === NavbarState.NON_MOBILE_COLLAPSED ? (
        <></>
      ) : (
        <h2 className="text-lg font-semibold">{item.category}</h2>
      )}
      
      <ul>
        {item.children.map((child, index) => (
          <NavbarSublistItem key={index} item={child} state={state} />
        ))}
      </ul>
    </li>
  );
};

export default NavbarSublist;
