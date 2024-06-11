import Link from "next/link";
import ThemedImage from "./ThemedImage";

type Props = {
  href: string;
  children: React.ReactNode;
};

function NavLink({ href, children }: Props) {
  return (
    <Link href={href} className="nav-link">
      {children}
      <ThemedImage
        lightSrc="/icons/nav-link-chevron-light-mode.svg"
        darkSrc="/icons/nav-link-chevron-dark-mode.svg"
        draggable={false}
        className="nav-link-chevron"
      />
    </Link>
  );
}

export default NavLink;
