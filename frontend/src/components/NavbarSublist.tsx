import { FC } from "react";
import { NavbarSublistProps } from "../utils/types";
import NavbarSublistItem from "./NavbarSublistItem";

const NavbarSublist: FC<NavbarSublistProps> = ({ item }) => {
  return (
    <li className="mt-5">
      <h2>{item.category}</h2>
      <ul>
        {item.children.map((child, index) => (
          <NavbarSublistItem key={index} item={child} />
        ))}
      </ul>
    </li>
  );
};

export default NavbarSublist;
