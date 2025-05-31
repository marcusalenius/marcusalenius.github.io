import "../typography.css";

import type { Metadata } from "next";
import fs from "fs";
import path from "path";

import PostPageClient from "../components/PostPage/PostPageClient";
import getPageMetadata from "../../utils/getPageMetadata.ts";
import data from "../../data.json";

export const metadata: Metadata = getPageMetadata(data, "kenboard");

export default async function KenboardPage() {
  const markdownFile = "kenboard.md";
  const filePath = path.join(process.cwd(), "markdown", markdownFile);
  const markdown = fs.readFileSync(filePath, "utf-8");
  return <PostPageClient data={data} postName="kenboard" markdown={markdown} />;
}
