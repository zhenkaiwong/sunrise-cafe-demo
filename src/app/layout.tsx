import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import {
  FaEnvelope,
  FaFacebook,
  FaHouse,
  FaInstagram,
  FaPhone,
} from "react-icons/fa6";
import { ReactNode } from "react";
import NavLinks from "@/ui/nav/NavLinks";
import LayoutHeader from "@/ui/LayoutHeader";
import LayoutLogo from "@/ui/LayoutLogo";

const playfairDisplay = Playfair_Display();

export const metadata: Metadata = {
  title: "Sunrise Cafe ☀️",
  description:
    "A local cafe based in Bukit Jalil, Kuala Lumpur. Committed to bring you the freshest morning with a cup of best coffee in town",
};

function FooterLink(props: { href: string; children: ReactNode }) {
  return (
    <a href={props.href} target="_blank" className="flex gap-2 items-center">
      {props.children}
    </a>
  );
}

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
        <LayoutHeader />
        <div className="pb-[5vw] min-h-screen">
          <Toaster />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  function ContactInfo() {
    return (
      <div className="flex-1 flex flex-col gap-3 items-center lg:items-start">
        <FooterLink href="https://maps.app.goo.gl/kHW3gnrFWaYq7nSa9">
          <FaHouse />
          123, Jalan Bagus 12, Bandar City, 43300, Kuala Lumpur
        </FooterLink>
        <FooterLink href="tel:076123456">
          <FaPhone /> 07-6123456
        </FooterLink>
        <FooterLink href="mailto:contact@sunrisecafe.fakemail">
          <FaEnvelope />
          contact@sunrisecafe.fakemail
        </FooterLink>
      </div>
    );
  }

  function Links() {
    return (
      <div className="flex-1 flex flex-col items-center gap-3">
        <div>
          <LayoutLogo />
        </div>
        <div className="flex gap-10 justify-center items-center">
          <NavLinks />
        </div>
      </div>
    );
  }

  function SocialMediaLinks() {
    return (
      <div className="flex flex-1 gap-10 justify-center lg:justify-end items-center">
        <a href="https://www.instagram.com" target="_blank">
          <FaInstagram size={"2rem"} />
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <FaFacebook size={"2rem"} />
        </a>
      </div>
    );
  }

  const baseStyles = "flex bg-[#5C4033] text-[#F5F5F5]";
  return (
    <>
      <footer className={`${baseStyles} flex-col gap-10 lg:hidden p-[10vw]`}>
        <Links />
        <SocialMediaLinks />
        <ContactInfo />
      </footer>
      <footer
        className={`${baseStyles} flex-row hidden lg:flex px-[4vw] py-[2vw]`}
      >
        <ContactInfo />
        <Links />
        <SocialMediaLinks />
      </footer>
    </>
  );
}
