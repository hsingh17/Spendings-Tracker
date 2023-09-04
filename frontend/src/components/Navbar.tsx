import { useState } from "react";
import NavbarFull from "./NavbarFull";
import NavbarCollapsed from "./NavbarCollapsed";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return <>{collapsed ? <NavbarCollapsed /> : <NavbarFull />}</>;
};

export default Navbar;
