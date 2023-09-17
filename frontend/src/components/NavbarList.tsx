import { NavbarListItem, NavbarListProps } from "../utils/types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import NavbarSublist from "./NavbarSublist";
import { FC } from "react";

function getItemsList(navigate: NavigateFunction): Array<NavbarListItem> {
  return [
    {
      category: "Overview",
      children: [
        {
          iconPath: "../assets/components/HomeIcon",
          name: "Home",
          onClick: () => navigate(Constants.HOME_PAGE),
        },
        {
          iconPath: "../assets/components/DashboardIcon",
          name: "Dashboard",
          onClick: () => navigate(Constants.DASHBOARD_PAGE),
        },
        {
          iconPath: "../assets/components/TableIcon",
          name: "View",
          onClick: () => navigate(Constants.VIEW_SPENDINGS_PAGE),
        },
        {
          iconPath: "../assets/components/MetricsIcon",
          name: "Metrics",
          onClick: () => navigate(Constants.METRICS_PAGE),
        },
      ],
    },
    {
      category: "Account",
      children: [
        {
          iconPath: "../assets/components/SettingsIcon",
          name: "Settings",
          onClick: () => navigate(Constants.SETTINGS_PAGE),
        },
        {
          iconPath: "../assets/components/LogoutIcon",
          name: "Logout",
          onClick: () => alert("Logging out (not really) TODO"),
        },
      ],
    },
  ];
}

const NavbarList: FC<NavbarListProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const items = getItemsList(navigate);

  return (
    <ul className="mt-10 h-fit">
      {items.map((item, index) => (
        <NavbarSublist key={index} item={item} collapsed={collapsed} />
      ))}
    </ul>
  );
};

export default NavbarList;
