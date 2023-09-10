import { ReactComponent as LeftArrow } from "../assets/raw/left-arrow.svg";

const NavbarFullHeader = () => {
  return (
    <div className="flex flex-row items-center mt-5 ml-5">
      <div className="w-10 h-10 bg-theme-cta"></div> {/*TODO*/}
      <h1 className="font-bold text-xl ml-3">Spendings Tracker</h1>
      <LeftArrow className="w-10 h-10  ml-auto hover:cursor-pointer" stroke="gray"/>
    </div>
  );
};

export default NavbarFullHeader;
