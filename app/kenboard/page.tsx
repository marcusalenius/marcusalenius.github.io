import "../typography.css";

import data from "../../data.json";

import Nav from "../components/Nav/Nav";
import Post from "../components/PostPage/Post";
import Footer from "../components/Footer/Footer";

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
