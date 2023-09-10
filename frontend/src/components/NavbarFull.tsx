import NavbarFullHeader from "./NavbarFullHeader";
import NavbarList from "./NavbarList";

const NavbarFull = () => {
  return (
    <div className="sticky top-0 left-0 bg-theme-brand-secondary h-screen w-96 text-theme-neutral">
      <NavbarFullHeader />
      <NavbarList />
    </div>
  );
};

export default NavbarFull;
