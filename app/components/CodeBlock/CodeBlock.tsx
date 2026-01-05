"use client";

import "./CodeBlock.css";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";

// Register only the languages you need
hljs.registerLanguage("python", python);
hljs.registerLanguage("cpp", cpp);

type Props = {
  children: React.ReactNode;
};

export default function CodeBlock({ children }: Props) {
  const { resolvedTheme } = useTheme();

  // Conditionally load theme CSS
  useEffect(() => {
    // Remove existing theme
    const existingLink = document.getElementById("highlight-theme");
    if (existingLink) {
      existingLink.remove();
    }

    // Create and inject the appropriate theme
    const link = document.createElement("link");
    link.id = "highlight-theme";
    link.rel = "stylesheet";

    if (resolvedTheme === "dark") {
      link.href =
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/github-dark.min.css";
    } else {
      link.href =
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/github.min.css";
    }

    document.head.appendChild(link);
  }, [resolvedTheme]);

  return <pre>{children}</pre>;
}
