import { useEffect, useState } from "react";
import NavbarHeader from "./NavbarHeader";
import NavbarList from "./NavbarList";
import useDetectMobile from "../hooks/useDetectMobile";

const NON_MOBILE_STYLE = "z-10 sticky top-0 bg-theme-brand-secondary h-screen w-fit text-theme-neutral p-5";
const MOBILE_STYLE = "z-10 sticky top-0 left-0 bg-theme-brand-secondary h-10 w-screen text-theme-neutral"

const Navbar = () => {
  const mobile = useDetectMobile();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(!mobile);

  useEffect(() => setShow(!mobile), [mobile]);

  return (
    <div className={mobile ? MOBILE_STYLE : NON_MOBILE_STYLE}>
      <span>&nbsp;</span>
      {show ? (
        <>
          <NavbarHeader
            mobile={mobile}
            collapsed={collapsed}
            parentSetCollapsed={setCollapsed}
          />
          <NavbarList collapsed={collapsed} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
