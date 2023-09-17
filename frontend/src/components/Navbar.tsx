import { useState } from "react";
import NavbarHeader from "./NavbarHeader";
import NavbarList from "./NavbarList";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div className="z-10 sticky top-0 bg-theme-brand-secondary h-screen w-fit text-theme-neutral p-5">
      <NavbarHeader collapsed={collapsed} parentSetCollapsed={setCollapsed} />
      <NavbarList collapsed={collapsed} />
    </div>
  );
};

export default Navbar;
