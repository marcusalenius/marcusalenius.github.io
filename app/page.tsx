import "./typography.css";

import data from "../data.json";

import Nav from "./components/Nav/Nav";
import HomeContainer from "./components/HomePage/HomeContainer";
import Footer from "./components/Footer/Footer";

function Home() {
  return (
    <>
      <Nav data={data} />
      <HomeContainer data={data} />
      <Footer />
    </>
  );
}

export default Home;
