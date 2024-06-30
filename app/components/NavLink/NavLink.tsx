import "./NavLink.css";

import Link from "next/link";
import ThemedImage from "../Media/ThemedImage";

type Props = {
  href: string;
  children: React.ReactNode;
};

// If href is an empty string, the component will render a div element instead of a Link element.
function NavLink({ href, children }: Props) {
  const content = (
    <>
      {children}
      <ThemedImage
        lightSrc="/icons/nav-link-chevron-light-mode.svg"
        darkSrc="/icons/nav-link-chevron-dark-mode.svg"
        draggable={false}
        className="nav-link-chevron"
      />
    </>
  );

  return href !== "" ? (
    <Link href={href} className="nav-link">
      {content}
    </Link>
  ) : (
    <div className="nav-link">{content}</div>
  );
}

export default NavLink;
