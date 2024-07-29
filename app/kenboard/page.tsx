import "../typography.css";

import type { Metadata } from "next";
import getPageMetadata from "../../utils/getPageMetadata.ts";

import data from "../../data.json";

import Nav from "../components/Nav/Nav";
import Post from "../components/PostPage/Post";
import Footer from "../components/Footer/Footer";

export const metadata: Metadata = getPageMetadata(data, "kenboard");

function KenboardPage() {
  return (
    <>
      <Nav data={data} homePage={false} />
      <Post postData={data.posts.kenboard} />
      <Footer />
    </>
  );
}

export default KenboardPage;