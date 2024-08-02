import "./typography.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";

import data from "../data.json";

// import Nav from "./components/Nav/Nav";
const DynamicNav = dynamic(() => import("./components/Nav/Nav"), {
  ssr: false,
});
import HomeContainer from "./components/HomePage/HomeContainer";
import Footer from "./components/Footer/Footer";

export const metadata: Metadata = {};

function HomePage() {
  return (
    <>
      <DynamicNav data={data} homePage={true} />
      <HomeContainer data={data} />
      <Footer />
    </>
  );
}

export default HomePage;
