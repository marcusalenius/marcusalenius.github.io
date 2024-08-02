import "./typography.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";

import data from "../data.json";

// import Nav from "./components/Nav/Nav";
const Nav = dynamic(() => import("./components/Nav/Nav"), {
  ssr: false,
});
import HomeContainer from "./components/HomePage/HomeContainer";
import Footer from "./components/Footer/Footer";

export const metadata: Metadata = {
  description: data.brief,
};

function HomePage() {
  return (
    <>
      <Nav data={data} homePage={true} />
      <HomeContainer data={data} />
      <Footer />
    </>
  );
}

export default HomePage;
