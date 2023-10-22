import { FC, Suspense, lazy } from "react";
import { NavbarState, NavbarSublistItemProps } from "../utils/types";

const NavbarSublistItem: FC<NavbarSublistItemProps> = ({ state, item }) => {
  const IconComponent = lazy(() => import(item.iconPath));

  return (
    <Suspense fallback={<></>}>
      <li
        className="flex flex-row py-3 px-3 rounded-lg opacity-70 items-center hover:cursor-pointer hover:opacity-100 hover:bg-slate-700 first:mt-2"
        onClick={item.onClick}
      >
        <IconComponent />
        {state === NavbarState.NON_MOBILE_COLLAPSED ? (
          <></>
        ) : (
          <h3 className="ml-2 text-lg font-normal">{item.name}</h3>
        )}
      </li>
    </Suspense>
  );
};

export default NavbarSublistItem;
