import "../typography.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import getPageMetadata from "../../utils/getPageMetadata.ts";

import data from "../../data.json";

// import Nav from "../components/Nav/Nav";
const Nav = dynamic(() => import("../components/Nav/Nav"), {
  ssr: false,
});
import Post from "../components/PostPage/Post";
import Footer from "../components/Footer/Footer";

// export const metadata: Metadata = getPageMetadata(data, "actordentify");

function AttentionPage() {
  return (
    <>
      <Nav data={data} homePage={false} />
      <Post postData={data.posts.attention} />
      <Footer />
    </>
  );
}

export default AttentionPage;
