import "../typography.css";

import data from "../../data.json";

import PostContainer from "../components/PostPage/PostContainer";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <PostContainer data={data} />
      <Footer />
    </>
  );
}

export default Home;
