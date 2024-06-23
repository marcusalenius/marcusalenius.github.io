import "./typography.css";

import data from "../data.json";

import Nav from "./components/Nav";
import HomeContainer from "./components/HomeContainer";
import Footer from "./components/Footer";

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
