import "./typography.css";

import type { Metadata } from "next";

import data from "../data.json";

import Nav from "./components/Nav/Nav";
import HomeContainer from "./components/HomePage/HomeContainer";
import Footer from "./components/Footer/Footer";

export const metadata: Metadata = {};

function Home() {
  return (
    <>
      <Nav data={data} homePage={true} />
      <HomeContainer data={data} />
      <Footer />
    </>
  );
}

export default Home;
