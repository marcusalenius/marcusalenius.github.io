"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type Props = {
  lightSrc: string;
  darkSrc: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
  draggable?: boolean;
};

// https://github.com/pacocoursey/next-themes?tab=readme-ov-file
function ThemedImage({
  lightSrc,
  darkSrc,
  width,
  height,
  alt = "",
  className = "",
  draggable = true,
}: Props) {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = lightSrc;
      break;
    case "dark":
      src = darkSrc;
      break;
    default:
      // Fallback to a transparent image
      src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      break;
  }

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      draggable={draggable}
      style={{ width: "auto" }}
    />
  );
}

export default ThemedImage;
