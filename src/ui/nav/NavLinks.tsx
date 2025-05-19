import Link from "next/link";

type Props = {
  isBurgerMenu?: boolean;
  toggleBurgerMenu?: () => void;
};

export default function NavLinks(props: Props) {
  function ResponsiveLink(linkProps: NavLinkProps) {
    return props.isBurgerMenu ? (
      <BurgerNavLink {...linkProps} />
    ) : (
      <NavLink {...linkProps} />
    );
  }
  return (
    <>
      <ResponsiveLink href={"/"} label="Home" />
      <ResponsiveLink href={"/menu"} label="Menu" />
      <ResponsiveLink href={"/about-us"} label="About Us" />
    </>
  );
}

type NavLinkProps = {
  href: string;
  label: string;
};

function NavLink(props: NavLinkProps) {
  return (
    <Link href={props.href} className="hover:underline">
      {props.label}
    </Link>
  );
}

function BurgerNavLink(props: NavLinkProps) {
  return (
    <Link
      href={props.href}
      className="hover:underline block p-5 bg-[#5C4033] text-[#F5F5F5]"
    >
      {props.label}
    </Link>
  );
}
