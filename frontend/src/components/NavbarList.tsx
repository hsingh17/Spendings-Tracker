import React from "react";
import { NavbarListItem } from "../utils/types";
import { useNavigate } from "react-router-dom";

const NavbarList = () => {
  const navigate = useNavigate();
  
  const ITEMS: Array<NavbarListItem> = [
    {
      category: "Overview",
      children: [
        {
          iconPath: "TODO",
          name: "Home",
          onClick: (e: React.MouseEvent) => e.preventDefault(), //TODO
        },
        {
          iconPath: "TODO",
          name: "Dashboard",
          onClick: (e: React.MouseEvent) => e.preventDefault(), //TODO
        },
        {
          iconPath: "TODO",
          name: "Table View",
          onClick: (e: React.MouseEvent) => e.preventDefault(), //TODO
        },
        {
          iconPath: "TODO",
          name: "Metrics",
          onClick: (e: React.MouseEvent) => e.preventDefault(), //TODO
        },
      ],
    },
    {
      category: "Account",
      children: [
        {
          iconPath: "TODO",
          name: "Settings",
          onClick: (e: React.MouseEvent) => e.preventDefault(), //TODO
        },
        {
          iconPath: "TODO",
          name: "Logout",
          onClick: (e: React.MouseEvent) => e.preventDefault(), //TODO
        },
      ],
    },
  ];

  return <></>;
};

export default NavbarList;
