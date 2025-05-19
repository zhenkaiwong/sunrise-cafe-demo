import { FaBars } from "react-icons/fa6";
import NavLinks from "./NavLinks";

type Props = {
  burgerMenuOnClick: () => void;
};

export default function Navbar(props: Props) {
  return (
    <>
      <nav className="flex md:hidden">
        {/* <NavLinks /> */}
        <FaBars size={"5vw"} onClick={props.burgerMenuOnClick} />
      </nav>
      <nav className="hidden md:flex gap-10">
        <NavLinks />
      </nav>
    </>
  );
}
