import "./Links.css";

import Link from "next/link";
import ThemedImage from "../Media/ThemedImage";

type Props = {
  href: string;
  children: React.ReactNode;
};

// If href is an empty string, the component will render a div element instead of a Link element.
export default function ExternalLink({ href, children }: Props) {
  const content = (
    <>
      {children}
      <ThemedImage
        lightSrc="/icons/external-link-icon-light-mode.svg"
        darkSrc="/icons/external-link-icon-dark-mode.svg"
        draggable={false}
        className="external-link-icon"
      />
    </>
  );

  return href !== "" ? (
    <Link href={href} className="external-link" target="_blank">
      {content}
    </Link>
  ) : (
    <div className="external-link">{content}</div>
  );
}
