import "../typography.css";

import data from "../../data.json";

import Post from "../components/PostPage/Post";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Post postData={data.posts.actordentify} />
      <Footer />
    </>
  );
}

export default Home;
