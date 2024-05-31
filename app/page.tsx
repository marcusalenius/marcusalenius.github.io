import './typography.css';

import data from '../data.json';

import Nav from "./components/Nav";
import HomeContainer from "./components/HomeContainer";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <HomeContainer data={data} />
      <Footer />
    </>
  );
}
