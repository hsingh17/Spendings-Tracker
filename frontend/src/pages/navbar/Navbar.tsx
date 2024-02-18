import { useEffect, useState } from "react";
import NavbarHeader from "./NavbarHeader";
import NavbarList from "./NavbarList";
import useDetectMobile from "../../hooks/useDetectMobile";
import { NavbarAction, NavbarListItem, NavbarState } from "../../utils/types";
import { Constants } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useLogout from "../../hooks/useLogout";
import QueryClientConfig from "../../config/QueryClientConfig";
import toast from "react-hot-toast";

const NON_MOBILE_STYLE =
  "z-10 sticky top-0 bg-theme-brand-secondary h-screen w-fit text-theme-neutral p-5 whitespace-nowrap overflow-y-scroll overflow-x-hidden";
const MOBILE_STYLE =
  "z-10 sticky top-0 left-0 bg-theme-brand-secondary h-20 w-screen text-theme-neutral";

function transitionState(action: NavbarAction): NavbarState {
  switch (action) {
    case NavbarAction.MOBILE_SHOW_MENU:
      return NavbarState.MOBILE_MENU_SHOWN;
    case NavbarAction.MOBILE_NAVIGATE_TO_PAGE:
    case NavbarAction.RESIZE_TO_MOBILE:
    case NavbarAction.MOBILE_HIDE_MENU:
      return NavbarState.MOBILE_MENU_HIDDEN;
    case NavbarAction.NON_MOBILE_COLLAPSE:
      return NavbarState.NON_MOBILE_COLLAPSED;
    case NavbarAction.NON_MOBILE_EXPAND:
    case NavbarAction.RESIZE_TO_NON_MOBILE:
      return NavbarState.NON_MOBILE_EXPANDED;
  }
}

const Navbar = () => {
  const { data: response } = useUser();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout(
    () => {
      navigate(Constants.LOGIN_PAGE);
      QueryClientConfig.removeQueries(["user"]); // Invalidate the user key from cache so we don't keep any cached user data
    },
    () => {
      toast.error("An unexpected error occurred while logging out!", {
        position: "bottom-center",
      });
    }
  );

  const isMobile = useDetectMobile();
  const [state, setState] = useState<NavbarState>(
    isMobile ? NavbarState.MOBILE_MENU_HIDDEN : NavbarState.NON_MOBILE_EXPANDED
  );

  const transitionStateWrapper = (action: NavbarAction) => {
    setState(transitionState(action));
  };

  const getNavList = (): Array<NavbarListItem> => {
    const navigateToPage = (page: string) => {
      navigate(page);
      if (isMobile) {
        transitionStateWrapper(NavbarAction.MOBILE_NAVIGATE_TO_PAGE);
      }
    };

    return [
      {
        category: "Overview",
        children: [
          {
            iconPath: "../../assets/components/HomeIcon",
            name: "Home",
            onClick: () => navigateToPage(Constants.HOME_PAGE),
          },
          {
            iconPath: "../../assets/components/DashboardIcon",
            name: "Dashboard",
            onClick: () => navigateToPage(Constants.DASHBOARD_PAGE),
          },
          {
            iconPath: "../../assets/components/TableIcon",
            name: "View",
            onClick: () => navigateToPage(Constants.VIEW_SPENDINGS_PAGE),
          },
          {
            iconPath: "../../assets/components/MetricsIcon",
            name: "Metrics",
            onClick: () => navigateToPage(Constants.METRICS_PAGE),
          },
        ],
      },
      {
        category: "Account",
        children: [
          {
            iconPath: "../../assets/components/SettingsIcon",
            name: "Settings",
            onClick: () => navigateToPage(Constants.SETTINGS_PAGE),
          },
          {
            iconPath: "../../assets/components/LogoutIcon",
            name: "Logout",
            onClick: () => logout(),
          },
        ],
      },
    ];
  };

  useEffect(
    () =>
      transitionStateWrapper(
        isMobile
          ? NavbarAction.RESIZE_TO_MOBILE
          : NavbarAction.RESIZE_TO_NON_MOBILE
      ),
    [isMobile]
  );

  if (!response || !response.data || !response.ok) {
    return <></>;
  }

  return (
    <div className={isMobile ? MOBILE_STYLE : NON_MOBILE_STYLE}>
      <NavbarHeader state={state} transitionState={transitionStateWrapper} />
      <NavbarList
        state={state}
        items={getNavList()}
        transitionState={transitionStateWrapper}
      />
    </div>
  );
};

export default Navbar;
