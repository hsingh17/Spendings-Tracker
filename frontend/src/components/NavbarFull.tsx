import NavbarFullHeader from "./NavbarFullHeader";
import NavbarList from "./NavbarList";

const NavbarFull = () => {
  return (
    <div className="sticky top-0 left-0 bg-theme-brand-secondary h-screen w-96 text-theme-neutral">
      <NavbarFullHeader />
      <NavbarList />
{/*       
      <div className="mt-10 ml-5">
        <ul>
          <li>
            <p>Overview</p>
            <ul className="ml-5 font-semibold">
              <li>Dashboard</li>
              <li>
                Spendings
                <ul></ul>
              </li>
            </ul>
          </li>

          <li className="mt-10">
            <p>Account</p>
            <ul className="font-semibold">
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default NavbarFull;
