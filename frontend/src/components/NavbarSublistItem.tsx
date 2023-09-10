import { FC, Suspense, lazy } from "react";
import { NavbarSublistItemProps } from "../utils/types";

const NavbarSublistItem: FC<NavbarSublistItemProps> = ({ item }) => {
  const IconComponent = lazy(() => import(item.iconPath));

  // TODO: Loading state for navbar
  return (
    <Suspense fallback={<h1>loading</h1>}> 
      <li 
        className="flex flex-row ml-3 mt-3 hover:cursor-pointer items-center"
        onClick={item.onClick}
      >
        <IconComponent />
        <h3 className="ml-2">{item.name}</h3>
      </li>
    </Suspense>
  );
};

export default NavbarSublistItem;