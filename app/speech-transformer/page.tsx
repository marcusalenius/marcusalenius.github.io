import "../typography.css";

import type { Metadata } from "next";
import fs from "fs";
import path from "path";

import PostPageClient from "../components/PostPage/PostPageClient";
import getPageMetadata from "../../utils/getPageMetadata.ts";
import data from "../../data.json";

export const metadata: Metadata = getPageMetadata(data, "speech-transformer");

export default async function SpeechTransformerPage() {
  const markdownFile = "speech-transformer.md";
  const filePath = path.join(process.cwd(), "markdown", markdownFile);
  const markdown = fs.readFileSync(filePath, "utf-8");
  return (
    <PostPageClient
      data={data}
      postName="speech-transformer"
      markdown={markdown}
    />
  );
}
