import "./typography.css";

import data from "../data.json";

import View from "./components/View";
import Nav from "./components/Nav";
import HomeContainer from "./components/HomeContainer";
import Footer from "./components/Footer";

function Home() {
  return (
    <View>
      <Nav data={data} />
      <HomeContainer data={data} />
      <Footer />
    </View>
  );
}

export default Home;
