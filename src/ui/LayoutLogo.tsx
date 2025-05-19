import Link from "next/link";

import { Great_Vibes, Playfair_Display } from "next/font/google";

const greateVibes = Great_Vibes({ weight: "400" });

export default function LayoutLogo() {
  return (
    <Link href={"/"} className={`${greateVibes.className} text-3xl `}>
      Sunrise Cafe{" "}
    </Link>
  );
}
