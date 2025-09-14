import Link from "next/link";

import { Great_Vibes } from "next/font/google";

const greateVibes = Great_Vibes({ weight: "400", subsets: ["cyrillic", "latin"] });

export default function LayoutLogo() {
  return (
    <Link href={"/"} className={`${greateVibes.className} text-3xl `}>
      Sunrise Cafe{" "}
    </Link>
  );
}
