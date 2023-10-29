import { useEffect, useState } from "react";
import NavbarHeader from "./NavbarHeader";
import NavbarList from "./NavbarList";
import useDetectMobile from "../hooks/useDetectMobile";
import { NavbarAction, NavbarListItem, NavbarState } from "../utils/types";
import { Constants } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const NON_MOBILE_STYLE =
  "z-10 sticky top-0 bg-theme-brand-secondary h-screen w-fit text-theme-neutral p-5";
const MOBILE_STYLE =
  "z-10 sticky top-0 left-0 bg-theme-brand-secondary h-20 w-screen text-theme-neutral";

const Navbar = () => {
  const {data: response} = useUser();
  const navigate = useNavigate();
  const mobile = useDetectMobile();
  const [state, setState] = useState<NavbarState>(
    mobile ? NavbarState.MOBILE_MENU_HIDDEN : NavbarState.NON_MOBILE_EXPANDED
  );

  const transitionState = (action: NavbarAction) => {
    switch (action) {
      case NavbarAction.MOBILE_SHOW_MENU:
        setState(NavbarState.MOBILE_MENU_SHOWN);
        return;
      case NavbarAction.MOBILE_NAVIGATE_TO_PAGE:
      case NavbarAction.RESIZE_TO_MOBILE:
      case NavbarAction.MOBILE_HIDE_MENU:
        setState(NavbarState.MOBILE_MENU_HIDDEN);
        return;
      case NavbarAction.NON_MOBILE_COLLAPSE:
        setState(NavbarState.NON_MOBILE_COLLAPSED);
        return;
      case NavbarAction.NON_MOBILE_EXPAND:
      case NavbarAction.RESIZE_TO_NON_MOBILE:
        setState(NavbarState.NON_MOBILE_EXPANDED);
        return;
    }
  };

  const getNavList = () : Array<NavbarListItem> => {
    const navigateToPage = (page: string) => {
      navigate(page);
      if (mobile) {
        transitionState(NavbarAction.MOBILE_NAVIGATE_TO_PAGE);
      }
    };

    return [
      {
        category: "Overview",
        children: [
          {
            iconPath: "../assets/components/HomeIcon",
            name: "Home",
            onClick: () => navigateToPage(Constants.HOME_PAGE),
          },
          {
            iconPath: "../assets/components/DashboardIcon",
            name: "Dashboard",
            onClick: () => navigateToPage(Constants.DASHBOARD_PAGE),
          },
          {
            iconPath: "../assets/components/TableIcon",
            name: "View",
            onClick: () => navigateToPage(Constants.VIEW_SPENDINGS_PAGE),
          },
          {
            iconPath: "../assets/components/MetricsIcon",
            name: "Metrics",
            onClick: () => navigateToPage(Constants.METRICS_PAGE),
          },
        ],
      },
      {
        category: "Account",
        children: [
          {
            iconPath: "../assets/components/SettingsIcon",
            name: "Settings",
            onClick: () => navigateToPage(Constants.SETTINGS_PAGE),
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

  useEffect(
    () =>
      transitionState(
        mobile
          ? NavbarAction.RESIZE_TO_MOBILE
          : NavbarAction.RESIZE_TO_NON_MOBILE
      ),
    [mobile]
  );

  if (!response || !response.data || !response.ok) {
    return <></>;
  }

  return (
    <div className={mobile ? MOBILE_STYLE : NON_MOBILE_STYLE}>
      <NavbarHeader state={state} transitionState={transitionState} />
      <NavbarList state={state} items={getNavList()} transitionState={transitionState} />
    </div>
  );
};

export default Navbar;
