import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const playfairDisplay = Playfair_Display();
const greateVibes = Great_Vibes({ weight: "400" });

export const metadata: Metadata = {
  title: "Sunrise Cafe ☀️",
  description:
    "A local cafe based in Bukit Jalil, Kuala Lumpur. Committed to bring you the freshest morning with a cup of best coffee in town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.className} antialiased text-[#5C4033]`}
      >
        <header className="p-5 bg-[#FFF8F0] flex justify-between shadow-lg">
          <Link href={"/"} className={`${greateVibes.className} text-2xl`}>
            Sunrise Cafe{" "}
          </Link>
          <nav className="flex gap-10">
            <NavLink href={"/"} label="Home" />
            <NavLink href={"/menu"} label="Menu" />
            <NavLink href={"/about-us"} label="About Us" />
          </nav>
        </header>
        <div>
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  );
}

function NavLink(props: { href: string; label: string }) {
  return (
    <Link href={props.href} className="hover:underline">
      {props.label}
    </Link>
  );
}
