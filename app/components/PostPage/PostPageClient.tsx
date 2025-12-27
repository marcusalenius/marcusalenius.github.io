"use client";

import dynamic from "next/dynamic";

import Post from "../../components/PostPage/Post";
import Footer from "../Footer/Footer";

const Nav = dynamic(() => import("../Nav/Nav"), { ssr: false });

export default function HomePageClient({
  data,
  postName,
  markdown,
}: {
  data: any;
  postName: string;
  markdown: string;
}) {
  const postNameToPostData: { [key: string]: any } = {
    actordentify: data.posts.actordentify,
    attention: data.posts.attention,
    kenboard: data.posts.kenboard,
    needle: data.posts.needle,
    "speech-transformer": data.posts["speech-transformer"],
    // Add other post names and their corresponding data here if needed
  };
  const postData = postNameToPostData[postName];
  return (
    <>
      <Nav data={data} homePage={false} />
      <Post postData={postData} postName={postName} markdown={markdown} />
      <Footer />
    </>
  );
}
