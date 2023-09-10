import { FC } from "react";
import { NavbarSublistProps } from "../utils/types";
import NavbarSublistItem from "./NavbarSublistItem";

const NavbarSublist: FC<NavbarSublistProps> = ({ collapsed, item }) => {
  return (
    <li className="last:mt-16">
      {collapsed ? (
        <></>
      ) : (
        <h2 className="text-lg font-semibold">{item.category}</h2>
      )}
      
      <ul>
        {item.children.map((child, index) => (
          <NavbarSublistItem key={index} item={child} collapsed={collapsed} />
        ))}
      </ul>
    </li>
  );
};

export default NavbarSublist;
