"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type Props = {
  lightSrc: string;
  darkSrc: string;
  width: number;
  height: number;
  darkWidth?: number;
  darkHeight?: number;
  lightId?: string;
  darkId?: string;
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
  darkWidth = width,
  darkHeight = height,
  lightId = "",
  darkId = "",
  alt = "",
  className = "",
  draggable = true,
}: Props) {
  const { resolvedTheme } = useTheme();
  let src;
  let id;
  let resolvedWidth = width;
  let resolvedHeight = height;

  switch (resolvedTheme) {
    case "light":
      src = lightSrc;
      id = lightId;
      break;
    case "dark":
      src = darkSrc;
      id = darkId;
      resolvedWidth = darkWidth;
      resolvedHeight = darkHeight;
      break;
    default:
      // Fallback to a transparent image
      src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      id = "";
      break;
  }

  return (
    <Image
      src={src}
      width={resolvedWidth}
      height={resolvedHeight}
      id={id}
      alt={alt}
      className={className}
      draggable={draggable}
      style={{ width: "auto" }}
    />
  );
}

export default ThemedImage;
