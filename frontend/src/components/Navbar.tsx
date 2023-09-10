import { useState } from "react";
import NavbarHeader from "./NavbarHeader";
import NavbarList from "./NavbarList";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div className="sticky top-0 left-0 bg-theme-brand-secondary h-screen w-fit text-theme-neutral p-5">
      <NavbarHeader collapsed={collapsed} parentSetCollapsed={setCollapsed} />
      <NavbarList collapsed={collapsed} />
    </div>
  );
};

export default Navbar;
