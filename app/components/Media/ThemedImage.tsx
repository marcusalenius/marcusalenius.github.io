"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type Props = {
  lightSrc: string;
  darkSrc: string;
  alt?: string;
  className?: string;
  lightClassName?: string;
  darkClassName?: string;
  lightId?: string;
  darkId?: string;
  draggable?: boolean;
};

// https://github.com/pacocoursey/next-themes?tab=readme-ov-file
export default function ThemedImage({
  lightSrc,
  darkSrc,
  alt = "",
  className = "",
  lightClassName = className,
  darkClassName = className,
  lightId = "",
  darkId = "",
  draggable = true,
}: Props) {
  const { resolvedTheme } = useTheme();
  let src;
  let id;
  let resolvedClassName;

  switch (resolvedTheme) {
    case "light":
      src = lightSrc;
      id = lightId;
      resolvedClassName = lightClassName;
      break;
    case "dark":
      src = darkSrc;
      id = darkId;
      resolvedClassName = darkClassName;
      break;
    default:
      // Fallback to a transparent image
      src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      id = "";
      resolvedClassName = className;
      break;
  }

  return (
    <Image
      src={src}
      width={0}
      height={0}
      id={id}
      alt={alt}
      className={resolvedClassName}
      draggable={draggable}
      style={{ width: "auto" }}
      quality={100}
    />
  );
}
