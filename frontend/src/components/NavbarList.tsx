import { NavbarListItem, NavbarListProps, NavbarState } from "../utils/types";
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

const NavbarList: FC<NavbarListProps> = ({ state, transitionState }) => {
  const navigate = useNavigate();
  const items = getItemsList(navigate);
  const isMobile: boolean =
    state === NavbarState.MOBILE_MENU_HIDDEN ||
    state === NavbarState.MOBILE_MENU_SHOWN;

  const mobileStyle: string = isMobile ? "p-5 h-screen w-screen absolute" : "mt-10 h-fit"
  if (state === NavbarState.MOBILE_MENU_HIDDEN) {
    return <></>;
  }

  return (
    <ul className={`${mobileStyle} bg-theme-brand-secondary`}>
      {items.map((item, index) => (
        <NavbarSublist key={index} item={item} state={state} />
      ))}
    </ul>
  );
};

export default NavbarList;
