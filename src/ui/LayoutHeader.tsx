"use client";

import { useEffect, useState } from "react";
import LayoutLogo from "./LayoutLogo";
import Navbar from "./nav/Navbar";
import NavLinks from "./nav/NavLinks";
import { usePathname } from "next/navigation";

export default function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
  const pathName = usePathname();
  const toggleBurgerMenu = () => {
    setShowBurgerMenu(!showBurgerMenu);
  };

  const turnOffBurgerMenu = () => {
    setShowBurgerMenu(false);
  };

  useEffect(() => {
    turnOffBurgerMenu();
  }, [pathName]);
  return (
    <>
      <header className="p-5 bg-[#FFF8F0] flex justify-between shadow-lg items-center">
        <LayoutLogo />
        <Navbar burgerMenuOnClick={toggleBurgerMenu} />
      </header>
      <div
        className={`md:hidden transition delay-300 ${
          showBurgerMenu ? "block" : "hidden"
        }`}
      >
        <NavLinks isBurgerMenu={showBurgerMenu} />
      </div>
    </>
  );
}
