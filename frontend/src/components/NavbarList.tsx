import { NavbarListItem } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import NavbarSublist from "./NavbarSublist";

const NavbarList = () => {
  const navigate = useNavigate();
  const ITEMS: Array<NavbarListItem> = [
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
          name: "View Spendings",
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

  return (
    <ul className="mt-7 ml-5">
      {ITEMS.map((item, index) => (
        <NavbarSublist key={index} item={item} />
      ))}
    </ul>
  );
};

export default NavbarList;
