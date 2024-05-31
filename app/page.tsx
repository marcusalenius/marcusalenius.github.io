import Image from "next/image";
import styles from "./page.module.css";
import Nav from "./components/Nav";
import HomeContainer from "./components/HomeContainer";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <HomeContainer />
      <Footer />
    </>
  );
}
